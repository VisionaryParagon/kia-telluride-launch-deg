import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { MatDialog } from '@angular/material';

import { CookieService } from 'ngx-cookie';

import { User } from './services/classes';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { UserService } from './services/user.service';
import { NotesService } from './services/notes.service';
import { AdminService } from './services/admin.service';

import { LeaderboardComponent } from './modals/leaderboard/leaderboard.component';
import { NotesComponent } from './modals/notes/notes.component';

import { NavAnimation } from './animations';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ NavAnimation ]
})
export class AppComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  lastPoppedUrl: string;
  yScrollStack: number[] = [];
  isLoggedIn = false;
  isLoggedInAdmin = false;
  isAdmin = false;
  notHome = false;
  hasNotes = false;
  state = 'inactive';
  subState1 = 'inactive';
  subState2 = 'inactive';

  constructor(
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private userService: UserService,
    private notesService: NotesService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        // save page scroll location
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        // Google Analytics events
        ga('set', 'page', ev.urlAfterRedirects);
        ga('send', 'pageview');

        // set page scroll
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }

        // check user status
        if (this.userId && !this.user._id) {
          this.userService.getUser(this.userId)
            .subscribe(
              res => {
                this.userService.setCurrentUser(res);
                this.user = this.userService.getCurrentUser();
                this.isLoggedIn = this.userService.loggedIn;
              },
              err => {/* this.error = err */}
            );
        }
        this.isLoggedIn = this.userService.loggedIn;
        this.isLoggedInAdmin = this.adminService.loggedIn;

        // route checks for nav
        // setTimeout(() => {
          if (ev.url === ('/' || '/admin')) {
            this.notHome = false;
          } else {
            this.notHome = true;
          }

          if (ev.url.indexOf('/admin') === 0) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }

          if ((this.notesService.noteModule.length > 0 || ev.url.indexOf(this.notesService.noteUrl) === 0) && this.notHome) {
            this.hasNotes = true;
          } else {
            this.hasNotes = false;
          }
        // }, 250);
      }
    });

    this.notesService.addNoteData();
  }

  goBack() {
    this.location.back();
  }

  openNotes() {
    const dialogRef = this.dialog.open(NotesComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '90vw'
    });
  }

  openLeaderboard() {
    const dialogRef = this.dialog.open(LeaderboardComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '90vw'
    });
  }

  toggleNav() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');

    if (document.documentElement.classList.contains('modal-open')) {
      document.documentElement.classList.remove('modal-open');
    } else {
      document.documentElement.classList.add('modal-open');
    }
  }

  closeNav() {
    this.state = 'inactive';
    document.documentElement.classList.remove('modal-open');
  }

  outsideNav() {
    if (this.state === 'active') {
      this.state = 'inactive';
      document.documentElement.classList.remove('modal-open');
    }
  }

  toggleSubNav(id) {
    if (id === 1) {
      this.subState1 = (this.subState1 === 'active' ? 'inactive' : 'active');
      this.subState2 = 'inactive';
    } else if (id === 2) {
      this.subState1 = 'inactive';
      this.subState2 = (this.subState2 === 'active' ? 'inactive' : 'active');
    }
  }

  closeSubNav() {
      this.subState1 = 'inactive';
      this.subState2 = 'inactive';
  }

  logout() {
    this.cookieService.removeAll();
    this.userService.clearCurrentUser();

    this.router.navigate(['/login']);
  }

  logoutAdmin() {
    this.cookieService.removeAll();
    this.adminService.logout();
    this.adminService.loggedIn = false;

    this.router.navigate(['/admin/login']);
  }
}
