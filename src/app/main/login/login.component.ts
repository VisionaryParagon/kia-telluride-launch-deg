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
  anyVal: any;
  loading = false;
  submitted = false;
  userChecked = false;
  sessionChecked = false;
  regSubmitted = false;
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

  changeStep(stepper, idx) {
    if (stepper) {
      if (idx === 0) {
        this.user = new User();
        this.hideError();
        this.userChecked = this.sessionChecked = this.regSubmitted = false;
      }
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
      this.changeStep(stepper, idx);

      this.userChecked = false;
      this.loading = false;
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

  startOver() {
    this.submitted = this.userChecked = this.sessionChecked = this.regSubmitted = false;
    this.user = new User();
    this.clicked = false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
