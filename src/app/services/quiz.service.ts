import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { QuizData, User } from './classes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizData: QuizData[];
  currentUser: User = this.userService.getCurrentUser();

  constructor(
    private http: HttpClient,
    public userService: UserService
  ) { }

  getQuizData() {
    return this.http.get<QuizData[]>('assets/data/quiz-data.json')
      .pipe(
        retry(3),
        tap(data => this.quizData = data),
        catchError(this.handleError)
      );
  }

  // get quiz answers
  getAnswers(quiz) {
    const allAnswers = [
      {
        name: 'Correct',
        value: 0
      },
      {
        name: 'Incorrect',
        value: 0
      }
    ];

    const quizLength = quiz.answers.length;
    const correctAnswers = quiz.answers.filter(answer => answer.answer === '0').length;

    allAnswers[0].value = correctAnswers;
    allAnswers[1].value = quizLength - correctAnswers;

    return allAnswers;
  }

  // get all current user answers
  getAllAnswers(user) {
    const allAnswers = [
      {
        name: 'Correct',
        value: 0
      },
      {
        name: 'Incorrect',
        value: 0
      }
    ];

    user.quizzes.forEach(quiz => {
      const quizLength = quiz.answers.length;
      const correctAnswers = quiz.answers.filter(answer => answer.answer === '0').length;

      allAnswers[0].value = correctAnswers;
      allAnswers[1].value = quizLength - correctAnswers;
    });

    return allAnswers;
  }

  // get quiz points
  getPoints(quiz) {
    let sum = 0;

    quiz.answers.forEach(answer => sum += answer.points);

    return sum;
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
