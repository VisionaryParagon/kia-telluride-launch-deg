import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Group } from './classes';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamUrl = '/tm/teams';
  activeGroup: Group = new Group();

  constructor(
    private http: HttpClient
  ) { }

  // set active group
  setActiveGroup(group) {
    this.activeGroup = group;
  }

  // get active group
  getActiveGroup() {
    return this.activeGroup;
  }

  // clear active group
  clearActiveGroup() {
    this.activeGroup = new Group();
  }

  // check duplicate teams
  validateTeam(data) {
    return this.http.post<any>(this.teamUrl + '/valid', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create team
  createTeam(data) {
    return this.http.post<Group>(this.teamUrl, data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get all team points
  getTeams() {
    return this.http.get<Group[]>(this.teamUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get one team points by _id
  getTeam(id) {
    const idUrl = this.teamUrl + '/' + id;
    return this.http.get<Group>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // delete team
  deleteTeam(data) {
    const idUrl = this.teamUrl + '/' + data._id;
    return this.http.delete(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // update team points
  updateTeam(data) {
    const idUrl = this.teamUrl + '/' + data._id;
    return this.http.put<Group>(idUrl, data)
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

