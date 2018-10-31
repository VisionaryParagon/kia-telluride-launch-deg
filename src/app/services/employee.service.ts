import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl = '/emp/users';

  constructor(
    private http: HttpClient
  ) { }

  // check duplicate sid
  checkKid(value) {
    return this.http.post<any>(this.employeeUrl + '/dup-sid', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // validate sid
  validateKid(value) {
    return this.http.post<any>(this.employeeUrl + '/valid-sid', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // validate dealer
  validateDealer(value) {
    return this.http.post<any>(this.employeeUrl + '/valid-dealer', value)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create new user
  createUser(user) {
    return this.http.post<any>(this.employeeUrl, user)
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
