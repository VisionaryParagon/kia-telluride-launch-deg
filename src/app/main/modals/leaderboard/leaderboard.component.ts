import { Component, OnInit } from '@angular/core';

import { User } from '../../../services/classes';
import { UserService } from '../../../services/user.service';
import { QuizService } from '../../../services/quiz.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  selectedTabIndex = 0;
  loading = true;
  error = false;

  // Team data setup
  teamPoints = [];
  teamColors = {
    domain: ['#bb162b', '#7e8083']
  };

  // Individual data setup
  user: User = this.userService.getCurrentUser();
  totalPoints = this.user.totalPoints;
  finalAnswers = this.quizService.getAllAnswers(this.user);
  chartView = [150, 150];
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  // Top 20 data setup
  topTwenty: any[];
  topTwentyCol = [
    'name',
    'team',
    'points',
    'speed'
  ];

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.getTeams();
    this.getTop();
  }

  // get all team points
  getTeams() {
    this.userService.getTeamPoints(this.user)
      .subscribe(
        usr => {
          // set user points
          let pointsArray = usr;

          // add admin points
          this.teamService.validateTeam(this.user)
            .subscribe(
              tm => {
                const temp = {};

                pointsArray = pointsArray.concat(tm[0].teams);

                pointsArray.forEach(x => {
                  temp[x.name] = temp[x.name] || { name: x.name, value: 0 };
                  temp[x.name].value = temp[x.name].value + x.value;
                });

                this.teamPoints = Object.keys(temp).map(k => temp[k]);
                this.loading = false;
              },
              err => {
                this.showError();
                this.loading = false;
              }
            );
        },
        err => {
          this.showError();
          this.loading = false;
        }
      );
  }

  // get top 20 list
  getTop() {
    this.userService.getTop20(this.user)
      .subscribe(
        res => this.topTwenty = res,
        () => this.showError()
      );
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
