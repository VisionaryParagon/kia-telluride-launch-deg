import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Group, Team } from '../../../services/classes';
import { TeamService } from '../../../services/team.service';

import { AddPoints, SubPoints } from '../../../animations';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
  animations: [ AddPoints, SubPoints ]
})
export class PointsComponent implements OnInit {
  group: Group = this.teamService.getActiveGroup();
  selected: Team;
  pointVal: number;
  teamData = [];
  plus = false;
  minus = false;
  error = false;

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<PointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (this.data) {
      this.selected = this.data.selected;
      this.teamData = this.data.teams;
    } else {
      this.showError();
    }
  }

  addPoints(num) {
    const temp = {};
    const pointData = this.teamData.filter(team => team.name === this.selected.name)[0];
    pointData.value += num;

    this.teamData.concat(pointData);
    this.teamData.forEach(x => {
      temp[x.name] = temp[x.name] || { name: x.name, value: 0 };
      temp[x.name].value = x.value;
    });

    this.pointVal = num;

    const updata = Object.keys(temp).map(k => temp[k]);

    const newData = {
      _id: this.group._id,
      teams: updata
    };

    this.teamService.updateTeam(newData)
      .subscribe(
        res => {
          this.teamService.setActiveGroup(res);
          this.teamData = this.group.teams;
          // this.selected.value += num;

          if (num > 0) {
            this.plus = true;
            setTimeout(() => {
              this.plus = false;
            }, 500);
          } else {
            this.minus = true;
            setTimeout(() => {
              this.minus = false;
            }, 500);
          }

          const start = this.selected.value;
          const counter = setInterval(t => {
            if (num > 0) {
              this.selected.value++;
            } else {
              this.selected.value--;
            }

            if (this.selected.value === start + num) {
              clearInterval(counter);
            }
          }, 25);
        },
        err => {
          this.showError();
        }
      );
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
