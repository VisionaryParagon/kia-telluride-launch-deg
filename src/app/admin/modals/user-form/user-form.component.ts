import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User, Group, Team } from '../../../services/classes';
import { UserService } from '../../../services/user.service';
import { EmployeeService } from '../../../services/employee.service';
import { SessionService } from '../../../services/session.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

import { KuidWarningComponent } from '../../../main/modals/kuid-warning/kuid-warning.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  userCache: User = new User();
  group: Group = new Group();
  teams: Team[] = [
    {
      name: 'Team Prestige',
      value: 0
    },
    {
      name: 'Team Innovative',
      value: 0
    }
  ];
  edit = false;
  changeDetected = false;
  noChanges = false;
  submitted = false;
  loading = false;
  success = false;
  emailUsed = false;
  invalidDealer = false;
  invalidSession = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    private dialog: MatDialog,
    private userService: UserService,
    private employeeService: EmployeeService,
    private sessionService: SessionService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .subscribe(
        res => this.closeDialog()
      );

    if (this.data._id) {
      this.user = this.data;
      this.userCache = {...this.data};
      this.edit = true;
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.closeDialog();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (this.changeDetected && !this.success) {
      event.returnValue = false;
    }
  }

  createUser(data) {
    this.userService.createUser(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('create user error')
      );
  }

  updateUser(data) {
    this.userService.updateUser(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('update user error')
      );
  }

  validateTeam(data) {
    this.teamService.validateTeam(data)
      .subscribe(
        res => {
          if (res.length) {
            // Proceed if group exists
            if (!this.edit) {
              this.createUser(data);
            } else {
              this.updateUser(data);
            }
          } else {
            // Create group if new
            this.group.dealer = data.dealer;
            this.group.session = data.session;
            this.group.teams = this.teams;

            this.teamService.createTeam(this.group)
              .subscribe(
                grpRes => {
                  if (!this.edit) {
                    this.createUser(data);
                  } else {
                    this.updateUser(data);
                  }
                },
                err => this.showError('create team error')
              );
          }
        },
        err => this.showError('validate team error')
      );
  }

  getSession(data) {
    this.sessionService.getSession(data)
      .subscribe(
        res => {
          if (res._id) {
            this.user.session_code = res.session_code;
            this.user.instructor = res.instructor;

            // Check if group exists
            if (!this.edit || data.team !== this.userCache.team) {
              this.validateTeam(this.user);
            } else {
              this.updateUser(this.user);
            }
          } else {
            this.invalidSession = true;
            this.loading = false;
          }
        },
        err => this.showError('ku session data error')
      );
  }

  checkDealer(data) {
    this.employeeService.checkDealer(data)
      .subscribe(
        res => {
          if ((!this.edit && res._id) || res._id !== data._id) {
            // Get KU session data
            if (!this.edit || data.session !== this.userCache.session) {
              this.getSession(this.user);
            } else {
              if (data.team !== this.userCache.team) {
                this.validateTeam(this.user);
              } else {
                this.updateUser(this.user);
              }
            }
          } else {
            this.invalidDealer = true;
            this.loading = false;
          }
        },
        err => this.showError('dealer validation error')
      );
  }

  getKuid(data) {
    this.employeeService.getKuid(data)
      .subscribe(
        res => {
          if (res.kuid) {
            this.user.kuid = res.kuid;

            // Validate dealer
            if (!this.edit || data.dealer !== this.userCache.dealer) {
              this.checkDealer(this.user);
            } else {
              if (data.session !== this.userCache.session) {
                this.getSession(this.user);
              } else {
                if (data.team !== this.userCache.team) {
                  this.validateTeam(this.user);
                } else {
                  this.updateUser(this.user);
                }
              }
            }
          } else {
            // kuid not found
            const dialogRef = this.dialog.open(KuidWarningComponent, {
              data: { hasKuid: false, email: data.email },
              height: '80vh',
              maxWidth: '90vw',
              width: '768px'
            });

            dialogRef.afterClosed()
              .subscribe(
                proceed => {
                  if (proceed) {
                    this.user.kuid = '';

                    // Validate dealer
                    if (!this.edit || data.dealer !== this.userCache.dealer) {
                      this.checkDealer(this.user);
                    } else {
                      if (data.session !== this.userCache.session) {
                        this.getSession(this.user);
                      } else {
                        if (data.team !== this.userCache.team) {
                          this.validateTeam(this.user);
                        } else {
                          this.updateUser(this.user);
                        }
                      }
                    }
                  }

                  this.loading = false;
                }
              );
          }
        },
        err => this.showError('employee info error')
      );
  }

  checkUser(data) {
    this.userService.checkUser(data)
      .subscribe(
        res => {
          if (!res._id) {
            // get employee kuid
            if (!this.edit || data.email !== this.userCache.email) {
              this.getKuid(data);
            } else {
              if (data.dealer !== this.userCache.dealer) {
                this.checkDealer(data);
              } else {
                if (data.session !== this.userCache.session) {
                  this.getSession(data);
                } else {
                  if (data.team !== this.userCache.team) {
                    this.validateTeam(data);
                  } else {
                    this.updateUser(data);
                  }
                }
              }
            }
          } else {
            this.emailUsed = true;
            this.loading = false;
          }
        },
        err => this.showError('validate email error')
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (!this.edit) {
        this.checkUser(data);
      } else {
        if (data.email === this.userCache.email) {
          if (data.dealer === this.userCache.dealer) {
            if (data.session === this.userCache.session) {
              if (data.team === this.userCache.team) {
                this.noChanges = true;
                this.loading = false;
              } else {
                this.validateTeam(data);
              }
            } else {
              this.getSession(data);
            }
          } else {
            this.checkDealer(data);
          }
        } else {
          this.checkUser(data);
        }
      }
    }
    return false;
  }

  showError(msg) {
    console.log(msg);
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.emailUsed = false;
    this.invalidDealer = false;
    this.invalidSession = false;
    this.error = false;
  }

  changed() {
    this.changeDetected = true;
  }

  startOver() {
    this.user = new User();
    this.submitted = false;
    this.hideError();
  }

  closeDialog() {
    if (this.changeDetected && !this.success) {
      if (confirm('These changes haven’t been submitted yet. Are you sure you want to leave?')) {
        this.dialogRef.close(this.user);
      }
    } else {
      this.dialogRef.close(this.user);
    }
  }
}
