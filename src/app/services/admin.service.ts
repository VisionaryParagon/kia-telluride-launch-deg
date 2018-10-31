import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Admin } from './classes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrlRoot = '/admn/';
  returnUrl: string;
  loggedIn = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // login
  login(user) {
    return this.http.post<any>(this.adminUrlRoot + 'login', user)
      .pipe(
        retry(3),
        tap(res => this.loggedIn = true),
        catchError(this.handleError)
      );
  }

  // logout
  logout() {
    return this.http.get<any>(this.adminUrlRoot + 'logout')
      .pipe(
        retry(3),
        tap(res => this.loggedIn = false),
        catchError(this.handleError)
      );
  }

  // get status
  status() {
    return this.http.get<any>(this.adminUrlRoot + 'status')
      .pipe(
        retry(3),
        tap(res => this.loggedIn = res.auth),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (isPlatformBrowser(this.platformId)) {
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
    } else {
      console.log(error);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
