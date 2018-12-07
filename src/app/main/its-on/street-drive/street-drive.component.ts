import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie';

import { User, StreetDrive, Vehicle, DriveNotes } from '../../../services/classes';
import { UserService } from '../../../services/user.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-street-drive',
  templateUrl: './street-drive.component.html',
  styleUrls: ['./street-drive.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class StreetDriveComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  active = 0;
  streetDrive: StreetDrive = new StreetDrive();
  dataReady = false;
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
            this.setData();
          },
          err => this.error = err
        );
    }

    this.setData();
  }

  setData() {
    if (this.user.streetDrive) {
      this.streetDrive = this.user.streetDrive;
    }
    /* else {
      this.streetDrive = new StreetDrive();

      this.streetDrive.kia = new Vehicle();
      this.streetDrive.comp = new Vehicle();

      this.streetDrive.kia.one = new DriveNotes();
      this.streetDrive.kia.two = new DriveNotes();
      this.streetDrive.kia.three = new DriveNotes();
      this.streetDrive.kia.four = new DriveNotes();
      this.streetDrive.kia.five = new DriveNotes();
      this.streetDrive.comp.one = new DriveNotes();
      this.streetDrive.comp.two = new DriveNotes();
      this.streetDrive.comp.three = new DriveNotes();
      this.streetDrive.comp.four = new DriveNotes();
      this.streetDrive.comp.five = new DriveNotes();
    }
    */

    this.dataReady = true;
  }

  setActive(id) {
    this.active = id;
  }

  setNotes(note) {
    console.log(note);
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
       this.timeout = null;
       this.user.streetDrive = this.streetDrive;
       this.userService.updateUser(this.user)
        .subscribe(
          res => this.userService.setCurrentUser(res),
          err => this.error = err
        );
    }, 1000);
  }
}
