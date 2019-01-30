import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription, timer } from 'rxjs';

import { Group } from '../../services/classes';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';

import { FadeAnimation } from '../../animations';

import { PointsComponent } from '../modals/points/points.component';
import { SessionsComponent } from '../modals/sessions/sessions.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  animations: [ FadeAnimation ]
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  group: Group = this.teamService.getActiveGroup();
  groupSelected = false;
  timer = timer(0, 1000);
  sub: Subscription;
  error = false;

  // Team data setup
  teamPoints = [];
  teamColors = {
    domain: ['#bb162b', '#7e8083']
  };

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    if (this.group._id) {
      this.groupSelected = true;
      this.getTeams();
      this.runTimer();
    }
  }

  selectSession() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    const dialogRef = this.dialog.open(SessionsComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          if (data) {
            this.teamService.setActiveGroup(data);
            this.group = this.teamService.getActiveGroup();
            this.groupSelected = true;
            this.getTeams();
          }

          this.runTimer();
        }
      );
  }

  runTimer() {
    this.sub = this.timer.subscribe(t => {
      if (t / 5 >= 1 && t % 5 === 0) {
        this.getTeams();
      }
    });
  }

  getTeams() {
    this.userService.getTeamPoints(this.group)
      .subscribe(
        usr => {
          // set user points
          let pointsArray = usr;

          // add admin points
          this.teamService.getTeam(this.group._id)
            .subscribe(
              tm => {
                const temp = {};

                pointsArray = pointsArray.concat(tm.teams);

                pointsArray.forEach(x => {
                  temp[x.name] = temp[x.name] || { name: x.name, value: 0 };
                  temp[x.name].value = temp[x.name].value + x.value;
                });

                this.teamPoints = Object.keys(temp).map(k => temp[k]);
              },
              err => this.showError()
            );
        },
        err => this.showError()
      );
  }

  onSelect(ev) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    const dialogRef = this.dialog.open(PointsComponent, {
      data: { selected: ev, teams: this.group.teams },
      height: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.group = this.teamService.getActiveGroup();
          this.getTeams();
          this.runTimer();
        }
      );
  }

  showError() {
    this.error = true;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
