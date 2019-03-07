import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Subscription, timer } from 'rxjs';

import { CookieService, CookieOptions } from 'ngx-cookie';

import { User, Quiz, Answer, QuizQuestion } from '../../../services/classes';
import { UserService } from '../../../services/user.service';
import { QuizService } from '../../../services/quiz.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class QuizComponent implements OnInit, OnDestroy {
  user: User = this.userService.getCurrentUser();
  quiz: Quiz = new Quiz();
  quizQuestions: QuizQuestion[];
  isCert: boolean;
  certScore: number;
  requiredScore: number;
  certPassed: boolean;
  hasAnswers: boolean;
  cookieExp = new Date();
  cookieOptions: CookieOptions = {
    expires: new Date()
  };
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
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private quizService: QuizService,
    public dialogRef: MatDialogRef<QuizComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    console.log(this.user);
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .subscribe(
        res => this.closeDialog()
      );

    // Set cookie exp
    this.cookieExp.setDate(this.cookieExp.getDate() + 7);
    this.cookieOptions.expires = this.cookieExp;

    // Set quiz data
    if (this.data) {
      this.hasAnswers = this.data.hasAnswers;
      this.isCert = this.data.quiz.isCert;
      this.requiredScore = this.data.quiz.requiredScore;

      this.setQuizData();

      // Run quiz
      if (!this.hasAnswers) {
        if (this.data.quiz.passcode) {
          if (this.cookieService.get(this.quiz.name)) {
            this.verified = true;
            this.runTimer();
          } else {
            this.verified = false;
          }
        } else {
          this.verified = true;
          this.runTimer();
        }
      } else {
        this.verified = true;

        this.quiz = this.user.quizzes.filter(quiz => quiz.name === this.quiz.name)[0];

        this.finalAnswers = this.quizService.getAnswers(this.quiz);

        if (!this.isCert) {
          this.totalPoints = this.quizService.getPoints(this.quiz);
        } else {
          this.certScore = this.finalAnswers[0].value / this.quiz.answers.length;

          if (this.certScore >= this.requiredScore) {
            this.certPassed = true;
          } else {
            this.certPassed = false;
          }
        }
      }
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.closeDialog();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (!this.hasAnswers) {
      event.returnValue = false;
    }
  }

  randomizeArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  setQuizData() {
    this.quiz.name = this.data.quiz.name;

    // Set quiz questions
    if (!this.isCert) {
      this.quizQuestions = this.data.quiz.questions;
    } else {
      this.quizQuestions = this.randomizeArray(this.data.quiz.questions).slice(0, 10);
    }

    // Preset user answers
    this.quizQuestions.forEach(question => this.quiz.answers.push(new Answer(question.key)));
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
      if (this.pw.toLowerCase() === this.data.quiz.passcode.toLowerCase()) {
        this.cookieService.put(this.quiz.name, 'verified', this.cookieOptions);
        this.verified = true;
        this.runTimer();
      } else {
        this.err = 'Passcode is invalid';
      }
    }
    return false;
  }

  setAnswer() {
    if (!this.isCert) {
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
  }

  next() {
    const currentAnswer = this.quiz.answers[this.activeQuestion];

    if (currentAnswer.answer.length) {
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

      // Count correct answers
      this.finalAnswers = this.quizService.getAnswers(this.quiz);

      if (!this.isCert) {
        // Points catchall
        this.quiz.answers.forEach(answer => {
          if (answer.answer !== '0') {
            answer.points = 0;
          }
          if (answer.answer === '0' && answer.points < 1) {
            answer.points = 1;
          }
        });

        // Count total points
        this.totalPoints = this.quizService.getPoints(this.quiz);

        // Tally user's total points
        this.user.totalPoints += this.totalPoints;

        // Push quiz to user
        this.user.quizzes.push(this.quiz);

        // Update user
        this.updateUser(this.user);
      } else {
        // Check pass/fail
        this.certScore = this.finalAnswers[0].value / this.quizQuestions.length;

        if (this.certScore >= this.requiredScore) {
          this.certPassed = true;
        } else {
          this.certPassed = false;
        }

        // Push quiz to user
        this.user.quizzes.push(this.quiz);
        this.user.certScore = this.certScore * 10;
        this.updateUser(this.user);

        // Submit transcript to KU and update user
        if (this.user.transcript_id && this.user.transcript_id.length) {
          const kuData = {
            kuid: this.user.kuid || '',
            course: 'SLS-07-168-1', // 'SLS-07-168-1-DEV',
            session: this.user.session_code || '',
            transcript: this.user.transcript_id || '',
            score: this.certScore * 100,
            passed: this.certPassed ? 'Y' : 'N',
            date: new Date().toLocaleDateString()
          };

          this.userService.createTranscript(kuData)
            .subscribe(
              res => {
                if (res.message === 'Success' && res.data.indexOf('CREATED') > -1) {
                  this.user.transcript_id = res.data.split('transcript_id>')[1].slice(0, -2);
                }

                this.updateUser(this.user);
              },
              err => {
                console.error('Transcript could not be sent to KiaUniversity');

                this.updateUser(this.user);
              }
            );
        }
      }
    }
    return false;
  }

  updateUser(user) {
    this.userService.updateUser(user)
      .subscribe(
        res => {
          // Update current user in UserService
          this.userService.setCurrentUser(this.user);

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

  getQuestion(key) {
    return this.data.quiz.questions.filter(q => q.key === key)[0].question;
  }

  correctAnswer(key) {
    return this.data.quiz.questions.filter(q => q.key === key)[0].options.filter(a => a.value === '0')[0].answer;
  }

  wrongAnswers(key) {
    return this.data.quiz.questions.filter(q => q.key === key)[0].options.filter(a => a.value !== '0');
  }

  getFeedback(key) {
    return this.data.quiz.questions.filter(q => q.key === key)[0].feedback;
  }

  resetQuiz() {
    this.user.quizzes.splice(this.user.quizzes.findIndex(quiz => quiz.name === this.data.quiz.name), 1);
    this.quiz = new Quiz();
    this.setQuizData();
    this.activeQuestion = 0;
    this.hasAnswers = false;
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

  openEval() {
    this.router.navigate(['/evaluation']);
    this.closeDialog();
  }

  closeDialog() {
    if (!this.hasAnswers) {
      if (confirm('This quiz hasn’t been submitted yet. Are you sure you want to leave?')) {
        this.dialogRef.close(this.user);
      }
    } else {
      this.dialogRef.close(this.user);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
