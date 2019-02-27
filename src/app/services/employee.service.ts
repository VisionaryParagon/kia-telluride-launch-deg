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

  // validate employee
  validateEmployee(data) {
    return this.http.post<any>(this.employeeUrl + 'validate', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create employee
  createEmployee(data) {
    return this.http.post<Employee>(this.employeeUrl + 'employees', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get all employees
  getEmployees() {
    return this.http.get<Employee[]>(this.employeeUrl + 'employees')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get one employee by _id
  getEmployeeId(id) {
    const idUrl = this.employeeUrl + 'employees/' + id;
    return this.http.get<Employee>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // delete employee
  deleteEmployee(data) {
    const idUrl = this.employeeUrl + 'employees/' + data._id;
    return this.http.delete(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // update employee
  updateEmployee(data) {
    const idUrl = this.employeeUrl + 'employees/' + data._id;
    return this.http.put<Employee>(idUrl, data)
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
