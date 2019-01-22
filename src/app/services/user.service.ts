import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { User } from './classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/usr/users';
  currentUser: User = new User();
  returnUrl: string;
  state = {
    loggedIn: false
  };

  constructor(
    private http: HttpClient
  ) { }

  // validate user email
  checkUser(value) {
    return this.http.post<any>(this.userUrl + '/email', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // validate user kuid
  checkKuid(value) {
    return this.http.post<any>(this.userUrl + '/kuid', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // set current user
  setCurrentUser(user) {
    this.currentUser = user;
    this.state.loggedIn = true;
  }

  // get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // clear current user
  clearCurrentUser() {
    this.currentUser = new User();
    this.state.loggedIn = false;
  }

  // get top 20 users
  getTop20(data) {
    return this.http.post<any>(this.userUrl + '/top', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get total team points
  getTeamPoints(data) {
    return this.http.post<any>(this.userUrl + '/points', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create KU transcript
  createTranscript(data) {
    return this.http.post<any>(this.userUrl + '/transcript', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create KU session
  createSession(data) {
    return this.http.post<any>(this.userUrl + '/session', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create new user
  createUser(user) {
    return this.http.post<User>(this.userUrl, user)
      .pipe(
        retry(3),
        tap(res => this.setCurrentUser(res)),
        catchError(this.handleError)
      );
  }

  // get all users
  getUsers() {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get one user
  getUser(user) {
    const idUrl = this.userUrl + '/' + user;
    return this.http.get<User>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // delete user
  deleteUser(user) {
    const idUrl = this.userUrl + '/' + user._id;
    return this.http.delete(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // update user
  updateUser(user) {
    const idUrl = this.userUrl + '/' + user._id;
    const updated = user;
    updated.modified = new Date();
    return this.http.put<User>(idUrl, updated)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'An error occurred; please try again later.');
  }
}
