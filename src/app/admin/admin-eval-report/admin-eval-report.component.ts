import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { User, UserEval, Evaluation } from '../../services/classes';
import { UserService } from '../../services/user.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-eval-report',
  templateUrl: './admin-eval-report.component.html',
  styleUrls: ['./admin-eval-report.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminEvalReportComponent implements OnInit {
  users: User[];
  evaluations: UserEval[] = [];
  evaluation: Evaluation = new Evaluation();
  dataSource: MatTableDataSource<UserEval>;
  displayedColumns: string[] = [
    'kuid',
    'first_name',
    'last_name',
    'answer1',
    'answer2',
    'answer3',
    'answer4',
    'answer5',
    'answer6',
    'answer7',
    'dealer',
    'session',
    'team',
    'instructor'
  ];
  pageIndex = 0;
  selectedUser: User = new User();
  filter = '';
  filterTimeout: any;
  sorter = '';
  sortOrder = '';
  loading = true;
  error = false;

  @ViewChild('tableFunctions') tableFunctions: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService
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

  scrollTop() {
    document.querySelector('.adminTable').scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        res => {
          this.users = res;
          this.users.forEach(user => {
            if (user.evaluation) {
              const userEval = new UserEval();

              for (const prop in user) {
                if (user.hasOwnProperty(prop) && userEval.hasOwnProperty(prop)) {
                  userEval[prop] = user[prop];
                }
              }

              userEval.answer1 = user.evaluation.answer1;
              userEval.answer2 = user.evaluation.answer2;
              userEval.answer3 = user.evaluation.answer3;
              userEval.answer4 = user.evaluation.answer4;
              userEval.answer5 = user.evaluation.answer5;
              userEval.answer6 = user.evaluation.answer6;
              userEval.answer7 = user.evaluation.answer7 ? 'Yes' : 'No';

              this.evaluations.push(userEval);
            }
          });

          this.dataSource = new MatTableDataSource(this.evaluations);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.search(this.filter);
          this.setHeight();
          this.loading = false;
        },
        err => this.showError()
      );
  }

  sortData(data) {
    this.sorter = data.active;
    this.sortOrder = data.direction;
  }

  search(data) {
    this.loading = true;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.dataSource.filter = data.trim().toLowerCase();
      this.evaluations = this.dataSource.filteredData;
      this.pageIndex = 0;
      this.scrollTop();
      this.loading = false;
    }, 1000);
  }

  clearFilter() {
    this.filter = '';
    this.search(this.filter);
  }

  select(user) {
    this.selectedUser === user ? this.selectedUser = new User() : this.selectedUser = user;
  }

  showError() {
    this.error = true;
    this.loading = false;
  }
}
