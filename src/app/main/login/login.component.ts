import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { UserService } from '../../services/user.service';
import { EmployeeService } from '../../services/employee.service';
import { User } from '../../services/classes';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  user: User = new User();
  userCookie = this.cookieService.get('userId');
  cookieExp = new Date();
  cookieOptions: CookieOptions = {
    expires: new Date()
  };
  clicked = false;
  reg = false;
  log = false;
  anyVal: any;
  firstName: string;
  loading = false;
  kidInvalid = false;
  kidUsed = false;
  kidChecked = false;
  sessionChecked = false;
  regSubmitted = false;
  registered = false;
  submitted = false;
  error = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    if (this.userCookie) {
      this.router.navigate(['../']);
    }

    // Set cookie exp
    this.cookieExp.setDate(this.cookieExp.getDate() + 7);
    this.cookieOptions.expires = this.cookieExp;

    // Get return url from route parameters or default to Home
    this.returnUrl = this.userService.returnUrl || '/';
    // this.returnUrl = '/';
  }

  toUppercase(val) {
    this.user.kid = val.toUpperCase();
  }

  changeStep(stepper, idx) {
    if (stepper) {
      if (idx === 0) {
        this.user = new User();
        this.hideError();
        this.kidChecked = this.sessionChecked = this.regSubmitted = false;
      }
      stepper.selectedIndex = idx;
    }
  }

  registerBtn(stepper, idx) {
    this.log = false;
    this.clicked = this.reg = true;
    this.changeStep(stepper, idx);
  }

  loginBtn() {
    this.reg = false;
    this.clicked = this.log = true;
  }

  checkUser(user, stepper, idx) {
    this.kidChecked = true;

    if (user.first_name && user.last_name && user.dealer) {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.changeStep(stepper, idx);
      }, 1000);
    }
  }

  checkKid(kid, stepper, idx) {
    this.kidChecked = true;

    if (kid) {
      this.loading = true;
      const kidVal = { kid: kid };
      this.employeeService.validateKid(kidVal)
        .subscribe(res => {
          if (res.kid) {
            this.userService.checkKid(kidVal)
              .subscribe(res2 => {
                if (!res2.used) {
                  this.user.first_name = this.firstName = res.first_name;
                  this.user.last_name = res.last_name;
                  this.user.dealer = res.dealer;

                  this.changeStep(stepper, idx);

                  this.hideError();
                  this.loading = false;
                  this.kidChecked = false;
                } else {
                  this.kidUsed = true;
                  this.kidChecked = false;
                  this.loading = false;
                }
              },
              err => {
                this.showError();
                this.kidChecked = false;
                this.loading = false;
              });
          } else {
            this.kidInvalid = true;
            this.kidChecked = false;
            this.loading = false;
          }
        },
        err => {
          this.showError();
          this.kidChecked = false;
          this.loading = false;
        });
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
  }

  register(user, isValid) {
    this.regSubmitted = true;

    if (isValid) {
      this.loading = true;
      this.error = false;
      this.userService.createUser(user)
        .subscribe(info => {
          // Set cookie
          this.cookieService.put('userId', info._id, this.cookieOptions);

          // Save login status
          this.userService.loggedIn = true;
          this.userService.setCurrentUser(info);

          this.hideError();
          this.regSubmitted = false;
          this.loading = false;

          // Redirect to saved URL or home
          this.router.navigateByUrl(this.returnUrl);
        },
        err => {
          this.showError();
          this.regSubmitted = false;
          this.loading = false;
        });
    }
    return false;
  }

  login(user) {
    this.submitted = true;

    if (user.kid) {
      this.loading = true;
      const kidVal = { kid: user.kid };
      this.employeeService.validateKid(kidVal)
        .subscribe(res => {
          if (res.kid) {
            this.userService.checkUser(kidVal)
              .subscribe(res2 => {
                if (res2.kid) {
                  // Set cookie
                  this.cookieService.put('userId', res2._id, this.cookieOptions);

                  // Save login status
                  this.userService.setCurrentUser(res2);

                  this.hideError();
                  this.submitted = false;
                  this.loading = false;

                  // Redirect to saved URL or home
                  this.router.navigateByUrl(this.returnUrl);
                } else {
                  this.registered = true;
                  this.submitted = false;
                  this.loading = false;
                }
              },
              err => {
                this.showError();
                this.submitted = false;
                this.loading = false;
              });
          } else {
            this.kidInvalid = true;
            this.submitted = false;
            this.loading = false;
          }
        },
        err => {
          this.showError();
          this.submitted = false;
          this.loading = false;
        });
    }
    return false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
    this.registered = false;
    this.kidInvalid = false;
    this.kidUsed = false;
  }
}
