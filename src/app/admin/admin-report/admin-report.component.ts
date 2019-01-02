import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { User, Report } from '../../services/classes';
import { UserService } from '../../services/user.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

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
    'created',
    'modified'
  ];
  selectedUser: User;
  loading = true;
  error = false;

  @ViewChild('tableFunctions') tableFunctions: ElementRef;
  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.setHeight();
          this.loading = false;
        },
        err => this.showError()
      );
  }

  @HostListener('window:resize') resize() {
    this.setHeight();
  }

  setHeight() {
    this.tableContainer.nativeElement.style.height = window.innerHeight - this.tableFunctions.nativeElement.offsetHeight - 85 + 'px';
  }

  filter(data) {
    this.dataSource.filter = data.trim().toLowerCase();
  }

  select(user) {
    this.selectedUser === user ? this.selectedUser = null : this.selectedUser = user;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
