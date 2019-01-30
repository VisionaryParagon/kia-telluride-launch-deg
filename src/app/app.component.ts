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

import { LeaderboardComponent } from './main/modals/leaderboard/leaderboard.component';
import { NotesComponent } from './main/modals/notes/notes.component';

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
  parentRoute: string;
  isLoggedIn = this.userService.state;
  isLoggedInAdmin = this.adminService.state;
  isLogin = false;
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
              },
              err => {/* this.error = err */}
            );
        }

        // route checks for nav
        this.parentRoute = ev.urlAfterRedirects.split('/').slice(0, -1).join('/');

        if (ev.urlAfterRedirects === ('/') || ev.urlAfterRedirects === ('/admin')) {
          this.notHome = false;
        } else {
          this.notHome = true;
        }

        if (ev.urlAfterRedirects.indexOf('/login') !== -1) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }

        if (ev.urlAfterRedirects.indexOf('/admin') === 0) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }

        if ((this.notesService.noteModule.length > 0 || ev.urlAfterRedirects.indexOf(this.notesService.noteUrl) === 0) && this.notHome) {
          this.hasNotes = true;
        } else {
          this.hasNotes = false;
        }
      }
    });

    this.notesService.addNoteData();
  }

  goBack() {
    this.router.navigate([this.parentRoute]);
  }

  openNotes() {
    const dialogRef = this.dialog.open(NotesComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });
  }

  openLeaderboard() {
    const dialogRef = this.dialog.open(LeaderboardComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '768px'
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
    this.adminService.state.loggedIn = false;
    this.adminService.logout()
      .subscribe(
        res => this.router.navigate(['/admin/login']),
        err => console.log('Could not log out admin')
      );
  }
}
