import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { User, Group, Session, Team } from '../../services/classes';
import { UserService } from '../../services/user.service';
import { EmployeeService } from '../../services/employee.service';
import { SessionService } from '../../services/session.service';
import { TeamService } from '../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { KuidWarningComponent } from '../modals/kuid-warning/kuid-warning.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  user: User = new User();
  userId = this.cookieService.get('userId');
  cookieExp = new Date();
  cookieOptions: CookieOptions = {
    expires: new Date()
  };
  clicked = false;
  anyVal: any;
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
  loading = false;
  submitted = false;
  userChecked = false;
  sessionChecked = false;
  invalidSession = false;
  regSubmitted = false;
  error = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private sessionService: SessionService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    if (this.userId) {
      this.router.navigate(['../']);
    }

    // Set cookie exp
    this.cookieExp.setDate(this.cookieExp.getDate() + 7);
    this.cookieOptions.expires = this.cookieExp;

    // Get return url from route parameters or default to Home
    this.returnUrl = this.userService.returnUrl || '/';
    // this.returnUrl = '/';
  }

  changeStep(stepper, idx) {
    if (stepper) {
      stepper.selectedIndex = idx;
    }
  }

  login(user, emailValid, stepper, idx) {
    this.submitted = true;

    if (emailValid) {
      this.loading = true;

      this.userService.checkUser(user)
        .subscribe(
          res => {
            if (!res._id) {
              this.loading = false;
              this.clicked = true;
              this.changeStep(stepper, idx);
            } else {
              this.setUser(res);
            }
          },
          err => {
            this.showError();
            this.loading = false;
          }
        );
    }
    return false;
  }

  checkUser(user, stepper, idx) {
    this.userChecked = true;

    if (user.first_name && user.last_name && user.dealer) {
      this.loading = true;

      this.employeeService.getKuid(user)
        .subscribe(
          res => {
            if (res.kuid) {
              this.user.kuid = res.kuid;

              // check for duplicate kuid
              this.userService.checkKuid(this.user)
                .subscribe(
                  resKuid => {
                    if (!resKuid._id) {
                      this.changeStep(stepper, idx);

                      this.userChecked = false;
                      this.loading = false;
                    } else {
                      const dialogRef = this.dialog.open(KuidWarningComponent, {
                        data: { hasKuid: true },
                        height: '80vh',
                        maxWidth: '90vw',
                        width: '768px'
                      });

                      dialogRef.afterClosed()
                        .subscribe(
                          proceed => {
                            if (proceed) {
                              this.startOver();
                            }
                          }
                        );
                    }
                  }
                );
            } else {
              const dialogRef = this.dialog.open(KuidWarningComponent, {
                data: { hasKuid: false },
                height: '80vh',
                maxWidth: '90vw',
                width: '768px'
              });

              dialogRef.afterClosed()
                .subscribe(
                  proceed => {
                    if (proceed) {
                      this.user.kuid = '';

                      this.changeStep(stepper, idx);
                    }

                    this.userChecked = false;
                    this.loading = false;
                  }
                );
            }
          },
          err => {
            this.showError();
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }
    return false;
  }

  checkSession(session, stepper, idx) {
    this.sessionChecked = true;

    if (session) {
      this.loading = true;

      // Get KU session data
      this.sessionService.getSession(this.user)
        .subscribe(
          res => {
            if (res._id) {
              this.user.session_code = res.session_code;
              this.user.instructor = res.instructor;

              // Check if group exists
              this.teamService.validateTeam(this.user)
                .subscribe(
                  tmRes => {
                    if (tmRes.length) {
                      // Proceed if group exists
                      this.changeStep(stepper, idx);

                      this.sessionChecked = false;
                      this.loading = false;
                    } else {
                      // Create group if new
                      this.group.dealer = this.user.dealer;
                      this.group.session = this.user.session;
                      this.group.teams = this.teams;

                      this.teamService.createTeam(this.group)
                        .subscribe(
                          grpRes => {
                            this.changeStep(stepper, idx);

                            this.sessionChecked = false;
                            this.loading = false;
                          },
                          err => {
                            this.showError();
                            this.loading = false;
                          }
                        );
                    }
                  },
                  err => {
                    this.showError();
                    this.loading = false;
                  }
                );
            } else {
              this.invalidSession = true;
              this.loading = false;
            }
          },
          err => {
            this.showError();
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }
    return false;
  }

  register(user, isValid) {
    this.regSubmitted = true;

    if (isValid) {
      this.loading = true;

      this.userService.createUser(user)
        .subscribe(
          res => this.setUser(res),
          err => {
            this.showError();
            this.loading = false;
          }
        );
    }
    return false;
  }

  setUser(user) {
    // Set cookie
    this.cookieService.put('userId', user._id, this.cookieOptions);

    // Save login status
    this.userService.setCurrentUser(user);

    this.hideError();
    this.loading = false;

    // Redirect to saved URL or home
    this.router.navigateByUrl(this.returnUrl);
  }

  startOver(clear?) {
    this.submitted = this.userChecked = this.sessionChecked = this.regSubmitted = this.loading = false;
    if (clear) {
      this.user = new User();
    }
    this.clicked = false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.invalidSession = false;
    this.error = false;
  }
}
