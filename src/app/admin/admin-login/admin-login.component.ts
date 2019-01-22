import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from '../../services/classes';
import { AdminService } from '../../services/admin.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminLoginComponent implements OnInit {
  returnUrl: string;
  admin: Admin = new Admin();
  loading = false;
  submitted = false;
  invalid = false;
  invalidUsername = false;
  invalidPassword = false;
  error = '';
  err = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    // Get return url from route parameters or default to Home
    this.returnUrl = this.adminService.returnUrl || '/admin';
  }

  login(user, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      this.adminService.login(user)
        .subscribe(
          res => {
            this.loading = false;

            if (res.message === 'Login successful!') {
              this.hideError();

              // Save login status
              this.adminService.state.loggedIn = true;

              // Redirect to saved URL or home
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.invalid = true;
              this.error = res.message;
            }
          },
          err => {
            this.loading = false;

            if (err.error.name === 'IncorrectUsernameError') {
              this.invalidUsername = true;
              this.invalid = true;
              this.error = 'Invalid username';
            } else if (err.error.name === 'IncorrectPasswordError') {
              this.invalidPassword = true;
              this.invalid = true;
              this.error = 'Invalid password';
            } else {
              this.showError();
            }
          }
        );
    }
    return false;
  }

  showError() {
    this.err = true;
  }

  hideError() {
    this.invalid = false;
    this.invalidUsername = false;
    this.invalidPassword = false;
    this.err = false;
  }
}
