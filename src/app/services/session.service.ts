import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Session } from './classes';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionUrl = '/ssn/session';

  constructor(
    private http: HttpClient
  ) { }

  // get session
  getSession(data) {
    return this.http.post<any>(this.sessionUrl, data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create session
  createSession(data) {
    return this.http.post<Session>(this.sessionUrl + 's', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get all sessions
  getSessions() {
    return this.http.get<Session[]>(this.sessionUrl + 's')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get one session by _id
  getSessionId(id) {
    const idUrl = this.sessionUrl + 's/' + id;
    return this.http.get<Session>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // delete session
  deleteSession(data) {
    const idUrl = this.sessionUrl + 's/' + data._id;
    return this.http.delete(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // update session
  updateSession(data) {
    const idUrl = this.sessionUrl + 's/' + data._id;
    return this.http.put<Session>(idUrl, data)
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

