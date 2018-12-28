import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Group } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class SessionsComponent implements OnInit {
  group: Group = new Group();
  submitted = false;
  loading = false;
  invalid = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<SessionsComponent>,
    private teamService: TeamService
  ) { }

  ngOnInit() {
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      this.teamService.validateTeam(data)
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
