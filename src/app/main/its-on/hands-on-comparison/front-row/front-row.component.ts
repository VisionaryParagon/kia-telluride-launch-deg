import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { User, DeepDive, DeepDiveData } from '../../../../services/classes';
import { UserService } from '../../../../services/user.service';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-front-row',
  templateUrl: './front-row.component.html',
  styleUrls: ['./front-row.component.scss'],
  animations: [ FadeAnimation ]
})
export class FrontRowComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  frontRow: DeepDiveData;
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
    } else if (!this.user.deepDive.frontRow) {
      this.user.deepDive.frontRow = new DeepDiveData();
    }

    this.frontRow = {...this.user.deepDive.frontRow};

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

    this.user.deepDive.frontRow[ev.name] = ev.value;
    this.updateUser(this.user);
  }

  setText(ev) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(() => {
      this.timeout = null;

      if (this.user.deepDive.frontRow.hasOwnProperty(ev.name) && this.user.deepDive.frontRow[ev.name].length > 0) {
        if (ev.value.length === 0) {
          this.user.totalPoints -= this.tenner;
        }
      } else {
        if (ev.value.length > 0) {
          this.user.totalPoints += this.tenner;
        }
      }

      if (this.user.deepDive.frontRow[ev.name] !== ev.value) {
        this.user.deepDive.frontRow[ev.name] = ev.value;
        this.updateUser(this.user);
      }
    }, 1000);
  }

  setTextBlur(ev) {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.user.deepDive.frontRow.hasOwnProperty(ev.name) && this.user.deepDive.frontRow[ev.name].length > 0) {
      if (ev.value.length === 0) {
        this.user.totalPoints -= this.tenner;
      }
    } else {
      if (ev.value) {
        this.user.totalPoints += this.tenner;
      }
    }

    if (this.user.deepDive.frontRow[ev.name] !== ev.value) {
      this.user.deepDive.frontRow[ev.name] = ev.value;
      this.updateUser(this.user);
    }
  }

  setRadio(ev) {
    if (!this.user.deepDive.frontRow.hasOwnProperty(ev.name) || this.user.deepDive.frontRow[ev.name].length === 0) {
      this.user.totalPoints += this.fiver;
    }

    this.user.deepDive.frontRow[ev.name] = ev.value;
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
