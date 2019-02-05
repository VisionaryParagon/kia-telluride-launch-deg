import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Employee } from './classes';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl = '/emp/';

  constructor(
    private http: HttpClient
  ) { }

  // get kuid
  getKuid(data) {
    return this.http.post<Employee>(this.employeeUrl + 'kuid', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // validate dealer
  checkDealer(data) {
    return this.http.post<Employee>(this.employeeUrl + 'dealer', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create new user
  createUser(user) {
    return this.http.post<Employee>(this.employeeUrl + 'new', user)
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
