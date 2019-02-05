import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

import { User } from '../../services/classes';
import { UserService } from '../../services/user.service';
import { QuizService } from '../../services/quiz.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { UserFormComponent } from '../modals/user-form/user-form.component';
import { UserDeleteComponent } from '../modals/user-delete/user-delete.component';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminReportComponent implements OnInit {
  users: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'kuid',
    'first_name',
    'last_name',
    'email',
    'dealer',
    'session',
    'team',
    'instructor',
    'certScore',
    'session_code',
    'transcript_id',
    'created',
    'modified'
  ];
  selectedUser: User = new User();
  filter = '';
  loading = true;
  error = false;

  @ViewChild('tableFunctions') tableFunctions: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  @HostListener('window:resize') resize() {
    this.setHeight();
  }

  setHeight() {
    this.tableContainer.nativeElement.style.height = window.innerHeight - this.tableFunctions.nativeElement.offsetHeight - 85 + 'px';
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        res => {
          this.users = res;

          this.users.forEach(user => {
            const certQuiz = user.quizzes.filter(q => q.name === 'Certification Test');
            if (!user.certScore) {
              if (certQuiz.length > 0) {
                const answers = this.quizService.getAnswers(certQuiz[0]);
                user.certScore = answers[0].value / certQuiz[0].answers.length * 10;
              } else {
                user.certScore = 0;
              }
            }
          });

          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.search(this.filter);
          this.setHeight();
          this.loading = false;
        },
        err => this.showError()
      );
  }

  search(data) {
    this.dataSource.filter = data.trim().toLowerCase();
  }

  clearFilter() {
    this.filter = '';
    this.search(this.filter);
  }

  select(user) {
    this.selectedUser === user ? this.selectedUser = new User() : this.selectedUser = user;
  }

  newUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: new User(),
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedUser = new User();
          this.getUsers();
        }
      );
  }

  editUser(user) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedUser = new User();
          this.getUsers();
        }
      );
  }

  deleteUser(user) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: user,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedUser = new User();
          this.getUsers();
        }
      );
  }

  updateUser(data) {
    this.userService.updateUser(data)
      .subscribe(
        res => {
          this.snackBar.open(`${data.first_name} ${data.last_name} successfully updated!`, '', {
            duration: 2500,
            panelClass: 'snackSuccess'
          });
          this.getUsers();
        },
        err => this.showError()
      );
  }

  submitCert(user) {
    let passed = false;

    if (user.certScore >= 8) {
      passed = true;
    } else {
      passed = false;
    }

    // Submit transcript to KU and update user
    const kuData = {
      kuid: user.kuid || '',
      course: 'SLS-07-168-1', // 'SLS-07-168-1-DEV',
      session: user.session_code || '',
      transcript: user.transcript_id || '',
      score: user.certScore * 10,
      passed: passed ? 'Y' : 'N',
      date: new Date().toLocaleDateString()
    };

    this.userService.createTranscript(kuData)
      .subscribe(
        res => {
          if (res.message === 'Success' && res.data.indexOf('CREATED') > -1) {
            this.selectedUser.transcript_id = res.data.split('transcript_id>')[1].slice(0, -2);
          }

          this.updateUser(this.selectedUser);
        },
        err => this.showError()
      );
  }

  showError() {
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.error = false;
  }
}
