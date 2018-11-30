import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { UserService } from '../../services/user.service';
import { EmployeeService } from '../../services/employee.service';
import { User } from '../../services/classes';

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
  loading = false;
  submitted = false;
  userChecked = false;
  sessionChecked = false;
  regSubmitted = false;
  error = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private userService: UserService,
    private employeeService: EmployeeService
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
              // Set cookie
              this.cookieService.put('userId', res._id, this.cookieOptions);

              // Save login status
              this.userService.setCurrentUser(res);

              this.hideError();
              this.loading = false;

              // Redirect to saved URL or home
              this.router.navigateByUrl(this.returnUrl);
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
                        width: '90vw'
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
                width: '90vw'
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
    this.loading = true;

    if (session) {
      this.changeStep(stepper, idx);

      this.sessionChecked = false;
      this.loading = false;
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
          res => {
            // Set cookie
            this.cookieService.put('userId', res._id, this.cookieOptions);

            // Save login status
            this.userService.setCurrentUser(res);

            this.hideError();
            this.loading = false;

            // Redirect to saved URL or home
            this.router.navigateByUrl(this.returnUrl);
          },
          err => {
            this.showError();
            this.loading = false;
          }
        );
    }
    return false;
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
    this.error = false;
  }
}
