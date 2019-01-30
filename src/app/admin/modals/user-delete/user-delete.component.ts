import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../../services/user.service';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
  animations: [ FadeAnimation ]
})
export class UserDeleteComponent implements OnInit {
  loading = false;
  success = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  delete() {
    this.loading = true;

    this.userService.deleteUser(this.data)
      .subscribe(
        res => {
          this.loading = false;
          this.success = true;
        },
        err => this.showError()
      );

    return false;
  }

  showError() {
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.error = false;
  }
}
