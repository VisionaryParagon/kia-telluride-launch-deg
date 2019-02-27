import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SessionService } from '../../../services/session.service';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-session-delete',
  templateUrl: './session-delete.component.html',
  styleUrls: ['./session-delete.component.scss'],
  animations: [ FadeAnimation ]
})
export class SessionDeleteComponent implements OnInit {
  loading = false;
  success = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<SessionDeleteComponent>,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  delete() {
    this.loading = true;

    this.sessionService.deleteSession(this.data)
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
