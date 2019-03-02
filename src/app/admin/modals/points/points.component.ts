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
  counter: any;
  newVal: number;
  error = false;

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<PointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (this.data) {
      this.selected = this.data.selected;
      this.newVal = this.selected.value;
      this.teamData = this.data.teams;
    } else {
      this.showError();
    }
  }

  runCounter() {
    if (this.counter) {
      clearInterval(this.counter);
    }

    this.counter = setInterval(t => {
      if (this.selected.value < this.newVal) {
        this.selected.value++;
      } else if (this.selected.value > this.newVal) {
        this.selected.value--;
      } else {
        clearInterval(this.counter);
      }
    }, 25);
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
    this.newVal += num;

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

          this.runCounter();
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
