import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  loggedIn = false;
  noteModule = '';
  noteUrl: string;

  constructor(
    private http: HttpClient
  ) { }

  // validate user
  checkUser(value) {
    return this.http.post<any>(this.userUrl + '/email', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // set current user
  setCurrentUser(user) {
    this.currentUser = user;
    this.loggedIn = true;
  }

  // get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // clear current user
  clearCurrentUser() {
    this.currentUser = new User();
    this.loggedIn = false;
  }

  // get all current user answers
  getAllAnswers() {
    let i = 0;
    const quizzes = this.currentUser.quizzes;
    const l = quizzes.length;
    const allAnswers = {
      correct: 0,
      incorrect: 0
    };

    for (i; i < l; i++) {
      const quiz = quizzes[i];
      const quizLength = Object.keys(quiz)
        .filter(k => k.indexOf('answer') === 0).length;
      const correctAnswers = (<any>Object).values(quiz)
        .filter(val => val === '0').length;

      allAnswers.correct = allAnswers.correct + correctAnswers;
      allAnswers.incorrect = allAnswers.incorrect + (quizLength - correctAnswers);
    }

    return allAnswers;
  }

  // get current user total points
  getTotalPoints() {
    let i = 0;
    const quizzes = this.currentUser.quizzes;
    const l = quizzes.length;
    let totalPoints = 0;

    for (i; i < l; i++) {
      const quiz = quizzes[i];
      const points = Object.keys(quiz)
        .filter(k => k.indexOf('points') === 0)
        .reduce((newData, k) => {
          newData[k] = quiz[k];
          return newData;
        }, {});

      const pointsSum = obj => (<any>Object).values(obj).reduce((a, b) => a + b);

      totalPoints = totalPoints + pointsSum(points);
    }

    return totalPoints;
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

  // get all ratings
  getAllRatings(data) {
    return this.http.post<any>(this.userUrl + '/ratings', data)
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
