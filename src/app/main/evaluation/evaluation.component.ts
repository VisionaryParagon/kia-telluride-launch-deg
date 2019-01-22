import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { Evaluation, User } from '../../services/classes';
import { UserService } from '../../services/user.service';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
  animations: [ FadeAnimation ]
})
export class EvaluationComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  evaluation: Evaluation = new Evaluation();
  loading = false;
  success = false;
  error = false;

  constructor(
    private cookieService: CookieService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userId && !this.user._id) {
      this.userService.getUser(this.userId)
        .subscribe(
          res => {
            this.userService.setCurrentUser(res);
            this.user = this.userService.getCurrentUser();
            this.checkEval(this.user);
          },
          err => this.error = err
        );
    } else {
      this.checkEval(this.user);
    }
  }

  checkEval(user) {
    if (user.evaluation) {
      this.success = true;
    } else {
      this.success = false;
    }
  }

  submit(data, isValid) {
    if (isValid) {
      this.loading = true;
      this.user.evaluation = data;
      this.userService.updateUser(this.user)
        .subscribe(
          res => {
            this.loading = false;
            this.success = true;
          },
          err => {
            this.loading = false;
            this.error = true;
          }
        );
    } else {
      this.error = true;
    }
    return false;
  }
}
