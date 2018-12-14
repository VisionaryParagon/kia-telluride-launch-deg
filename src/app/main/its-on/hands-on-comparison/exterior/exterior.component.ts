import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { User, DeepDive, ExteriorData } from '../../../../services/classes';
import { UserService } from '../../../../services/user.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-exterior',
  templateUrl: './exterior.component.html',
  styleUrls: ['./exterior.component.scss'],
  animations: [ FadeAnimation ]
})
export class ExteriorComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  exterior: ExteriorData;
  fiver = 5;
  tenner = 10;
  timeout: any;
  error = '';

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
            this.checkAnswers();
          },
          err => this.error = err
        );
    }

    this.checkAnswers();
  }

  checkAnswers() {
    if (!this.user.deepDive) {
      this.user.deepDive = new DeepDive();
    }
    this.exterior = {...this.user.deepDive.exterior};
  }

  setCheck(ev) {
    if (ev.value) {
      this.user.totalPoints += this.fiver;
    } else {
      this.user.totalPoints -= this.fiver;
    }

    this.user.deepDive.exterior[ev.name] = ev.value;
    this.updateUser(this.user);
  }

  setText(ev) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      if (this.user.deepDive.exterior.hasOwnProperty(ev.name) && this.user.deepDive.exterior[ev.name].length > 0) {
        if (ev.value.length === 0) {
          this.user.totalPoints -= this.tenner;
        }
      } else {
        if (ev.value.length > 0) {
          this.user.totalPoints += this.tenner;
        }
      }

      this.user.deepDive.exterior[ev.name] = ev.value;
      this.updateUser(this.user);
    }, 1000);
  }

  setRadio(ev) {
    if (!this.user.deepDive.exterior.hasOwnProperty(ev.name) || this.user.deepDive.exterior[ev.name].length === 0) {
      this.user.totalPoints += this.fiver;
    }

    this.user.deepDive.exterior[ev.name] = ev.value;
    this.updateUser(this.user);
  }

  updateUser(user) {
    this.userService.updateUser(user)
      .subscribe(
        res => this.userService.setCurrentUser(res),
        err => this.error = err
      );
  }
}
