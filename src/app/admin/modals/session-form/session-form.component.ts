import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Session, Group, Team } from '../../../services/classes';
import { SessionService } from '../../../services/session.service';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class SessionFormComponent implements OnInit {
  session: Session = new Session();
  sessionCache: Session = new Session();
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
  invalidSession = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<SessionFormComponent>,
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
      this.session = this.data;
      this.sessionCache = {...this.data};
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

  createSession(data) {
    this.sessionService.createSession(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('create session error')
      );
  }

  updateSession(data) {
    this.sessionService.updateSession(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('update session error')
      );
  }

  validateTeam(data) {
    this.teamService.validateTeam(data)
      .subscribe(
        res => {
          if (res._id) {
            // Proceed if group exists
            if (!this.edit) {
              this.createSession(data);
            } else {
              this.updateSession(data);
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
                    this.createSession(data);
                  } else {
                    this.updateSession(data);
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
          if (!res._id) {
            if (!this.edit) {
              this.validateTeam(this.session);
            } else {
              this.updateSession(this.session);
            }
          } else {
            this.invalidSession = true;
            this.loading = false;
          }
        },
        err => this.showError('ku session data error')
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (!this.edit) {
        this.getSession(data);
      } else {
        if (data.dealer === this.sessionCache.dealer && data.session === this.sessionCache.session) {
          if (data.session_code === this.sessionCache.session_code && data.instructor === this.sessionCache.instructor) {
            this.noChanges = true;
            this.loading = false;
          } else {
            this.validateTeam(data);
          }
        } else {
          this.getSession(data);
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
    this.invalidSession = false;
    this.error = false;
  }

  changed() {
    this.changeDetected = true;
  }

  startOver() {
    this.session = new Session();
    this.submitted = false;
    this.hideError();
  }

  closeDialog() {
    if (this.changeDetected && !this.success) {
      if (confirm('These changes haven’t been submitted yet. Are you sure you want to leave?')) {
        this.dialogRef.close(this.session);
      }
    } else {
      this.dialogRef.close(this.session);
    }
  }
}
