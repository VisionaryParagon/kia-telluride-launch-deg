import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { User, DeepDive, SecondThirdRowData } from '../../../../services/classes';
import { UserService } from '../../../../services/user.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-second-third-row',
  templateUrl: './second-third-row.component.html',
  styleUrls: ['./second-third-row.component.scss'],
  animations: [ FadeAnimation ]
})
export class SecondThirdRowComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  secondThirdRow: SecondThirdRowData;
  dataReady = false;
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
    } else if (!this.user.deepDive.secondThirdRow) {
      this.user.deepDive.secondThirdRow = new SecondThirdRowData();
    }

    this.secondThirdRow = {...this.user.deepDive.secondThirdRow};

    this.dataReady = true;
  }

  scroll(id) {
    setTimeout(() => {
      const offset = document.getElementsByTagName('header')[0].offsetHeight + 10;
      const bodyTop = document.body.getBoundingClientRect().top;
      const elTop = document.getElementById(id).getBoundingClientRect().top;
      const elPos = elTop - bodyTop - offset;

      window.scrollTo({
        top: elPos,
        behavior: 'smooth'
      });
    }, 250);
  }

  setCheck(ev) {
    if (ev.value) {
      this.user.totalPoints += this.fiver;
    } else {
      this.user.totalPoints -= this.fiver;
    }

    this.user.deepDive.secondThirdRow[ev.name] = ev.value;
    this.updateUser(this.user);
  }

  setText(ev) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(() => {
      this.timeout = null;

      if (this.user.deepDive.secondThirdRow.hasOwnProperty(ev.name) && this.user.deepDive.secondThirdRow[ev.name].length > 0) {
        if (ev.value.length === 0) {
          this.user.totalPoints -= this.tenner;
        }
      } else {
        if (ev.value.length > 0) {
          this.user.totalPoints += this.tenner;
        }
      }

      if (this.user.deepDive.secondThirdRow[ev.name] !== ev.value) {
        this.user.deepDive.secondThirdRow[ev.name] = ev.value;
        this.updateUser(this.user);
      }
    }, 1000);
  }

  setTextBlur(ev) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.user.deepDive.secondThirdRow.hasOwnProperty(ev.name) && this.user.deepDive.secondThirdRow[ev.name].length > 0) {
      if (ev.value.length === 0) {
        this.user.totalPoints -= this.tenner;
      }
    } else {
      if (ev.value) {
        this.user.totalPoints += this.tenner;
      }
    }

    if (this.user.deepDive.secondThirdRow[ev.name] !== ev.value) {
      this.user.deepDive.secondThirdRow[ev.name] = ev.value;
      this.updateUser(this.user);
    }
  }

  setRadio(ev) {
    if (!this.user.deepDive.secondThirdRow.hasOwnProperty(ev.name) || this.user.deepDive.secondThirdRow[ev.name].length === 0) {
      this.user.totalPoints += this.fiver;
    }

    this.user.deepDive.secondThirdRow[ev.name] = ev.value;
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
