import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Subscription, timer } from 'rxjs';

import { User, Quiz, Answer, QuizData } from '../../../services/classes';
import { UserService } from '../../../services/user.service';
import { QuizService } from '../../../services/quiz.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class QuizModalComponent implements OnInit, OnDestroy {
  user: User = this.userService.getCurrentUser();
  quiz: Quiz = new Quiz();
  finishedQuiz: Quiz;
  isCert: boolean;
  hasAnswers: boolean;
  pw: string;
  verified: boolean;
  submitted = false;
  err = '';
  activeQuestion = 0;
  maxPoints = 10;
  timer = timer(0, 1000);
  sub: Subscription;
  time: number;
  points: number;
  loading = false;
  finalAnswers = [];
  totalPoints = 0;
  chartView = [150, 150];
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };
  error = false;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    public dialogRef: MatDialogRef<QuizModalComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (this.data) {
      this.quiz.name = this.data.quiz.name;
      this.data.quiz.questions.forEach(question => this.quiz.answers.push(new Answer()));
      this.isCert = this.data.quiz.isCert;
      this.hasAnswers = this.data.hasAnswers;

      if (this.data.quiz.passcode && !this.hasAnswers) {
        this.verified = false;
      } else {
        this.verified = true;
      }

      if (this.hasAnswers) {
        this.finishedQuiz = this.user.quizzes.filter(quiz => quiz.name === this.quiz.name)[0];

        this.finalAnswers = this.quizService.getAnswers(this.finishedQuiz);

        this.totalPoints = this.quizService.getPoints(this.finishedQuiz);
      }
    }
  }

  runTimer() {
    this.time = 0;
    this.points = this.maxPoints;
    this.sub = this.timer.subscribe(t => {
      this.time = t;

      if (t / 3 >= 1 && t % 3 === 0 && this.points > 1) {
        this.points--;
      }
    });
  }

  startQuiz(code) {
    this.submitted = true;

    if (code.valid) {
      if (this.pw === this.data.quiz.passcode) {
        this.verified = true;
        this.runTimer();
      } else {
        this.err = 'Passcode is invalid';
      }
    }
    return false;
  }

  setAnswer() {
    this.sub.unsubscribe();

    // Set time and points
    const currentAnswer = this.quiz.answers[this.activeQuestion];

    if (currentAnswer.time) {
      currentAnswer.time += this.time;
      currentAnswer.points -= (this.maxPoints - this.points);
    } else {
      currentAnswer.time = this.time;
      currentAnswer.points = this.points;
    }

    this.runTimer();
  }

  next() {
    console.log(this.quiz);
    const currentAnswer = this.quiz.answers[this.activeQuestion];

    if (currentAnswer.answer) {
      this.sub.unsubscribe();
      this.activeQuestion++;
      this.runTimer();
    } else {
      this.setError('Please select an answer');
    }
  }

  prev() {
    this.sub.unsubscribe();

    this.activeQuestion--;

    this.runTimer();
  }

  submit(isValid) {
    this.error = false;

    if (isValid) {
      this.loading = true;
      this.sub.unsubscribe();

      // Points catchall
      this.quiz.answers.forEach(answer => {
        if (answer.answer !== '0') {
          answer.points = 0;
        }
        if (answer.answer === '0' && answer.points < 1) {
          answer.points = 1;
        }
      });

      // Count correct answers
      this.finalAnswers = this.quizService.getAnswers(this.quiz);

      // Count total points
      this.totalPoints = this.quizService.getPoints(this.quiz);

      // Push quiz to user
      this.user.quizzes.push(this.quiz);

      // Submit quiz to user database
      this.userService.updateUser(this.user)
        .subscribe(
          res => {
            // Update current user in UserService
            this.userService.setCurrentUser(res);

            // Open results
            this.hasAnswers = true;
            this.loading = false;
          },
          err => {
            // Update current user in UserService
            this.userService.setCurrentUser(this.user);

            // Open results
            this.hasAnswers = true;
            this.loading = false;

            /*
            // Show error
            this.error = true;
            this.loading = false;

            // Pop quiz from user
            this.user.quizzes.pop();
            */
          }
        );
    }
    return false;
  }

  correctAnswer(index) {
    return this.data.quiz.questions[index].options.filter(ans => ans.value === '0')[0].answer;
  }

  wrongAnswers(index) {
    return this.data.quiz.questions[index].options.filter(ans => ans.value !== '0');
  }

  resetQuiz() {
    this.quiz = new Quiz();
    this.hasAnswers = false;
    this.activeQuestion = 0;
    this.runTimer();
  }

  setError(err) {
    this.error = true;

    this.snackBar.open(err, '', {
      duration: 2500,
      panelClass: 'snackError'
    });
  }

  hideError() {
    this.err = '';
    this.error = false;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
