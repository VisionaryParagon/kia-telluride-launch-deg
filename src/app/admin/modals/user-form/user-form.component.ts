import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../../services/classes';
import { UserService } from '../../../services/user.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  userCache: User = new User();
  edit = false;
  submitted = false;
  loading = false;
  success = false;
  emailUsed = false;
  invalid = false;
  error = false;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
      this.userCache = {...this.data};
      this.edit = true;
    }
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (!this.edit || (this.edit && data.email !== this.userCache.email)) {
        this.userService.checkUser(data)
          .subscribe(
            res => {
              if (!res._id) {
                // validate KUID
                // validate session
                // assign sessionId
                this.userService.createUser(data)
                  .subscribe(
                    createRes => {
                      this.success = true;
                      this.loading = false;
                    },
                    err => {
                      this.showError();
                      this.loading = false;
                    }
                  );
              } else {
                this.emailUsed = true;
                this.loading = false;
              }
            },
            err => {
              this.showError();
              this.loading = false;
            }
          );
      } else {
        // validate email
        // validate KUID
        // validate session
        // assign sessionId
        this.userService.updateUser(data)
          .subscribe(
            res => {
              if (res._id) {
                this.dialogRef.close(res);
              } else {
                this.invalid = true;
              }
              this.loading = false;
            },
            err => {
              this.showError();
              this.loading = false;
            }
          );
      }
    }
    return false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.invalid = false;
    this.error = false;
  }
}
