import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CookieService } from 'ngx-cookie';

import { User, QuizData } from '../../services/classes';
import { UserService } from '../../services/user.service';
import { QuizService } from '../../services/quiz.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { QuizComponent } from '../../modals/quiz/quiz.component';

@Component({
  selector: 'app-rock-on',
  templateUrl: './rock-on.component.html',
  styleUrls: ['./rock-on.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class RockOnComponent implements OnInit {
  user: User = this.userService.getCurrentUser();
  userId: string = this.cookieService.get('userId');
  quizName = 'Certification Test';
  quizData: QuizData;
  hasAnswers = false;
  error = '';

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    private userService: UserService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    if (this.userId && !this.user._id) {
      this.userService.getUser(this.userId)
        .subscribe(
          res => {
            this.userService.setCurrentUser(res);
            this.user = this.userService.getCurrentUser();
            this.checkQuiz();
          },
          err => this.error = err
        );
    } else {
      this.checkQuiz();
    }

    this.quizService.getQuizData()
      .subscribe(
        res => this.quizData = res.filter(quiz => quiz.name === this.quizName)[0],
        err => this.error = 'Quiz data could not be retrieved. Please refresh this page to try again.'
      );
  }

  checkQuiz() {
    if (this.user.quizzes) {
      this.hasAnswers = this.user.quizzes.filter(quiz => quiz.name === this.quizName).length > 0;
    }
  }

  launchQuiz() {
    const dialogRef = this.dialog.open(QuizComponent, {
      data: { quiz: this.quizData, hasAnswers: this.hasAnswers },
      height: '90vh',
      maxWidth: '90vw',
      width: '90vw'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          console.log('Updated user:', data);
          this.checkQuiz();
        }
      );
  }

  hideError() {
    this.error = '';
  }
}
