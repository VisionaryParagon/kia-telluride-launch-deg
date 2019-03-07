import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

import { Session } from '../../services/classes';
import { AdminService } from '../../services/admin.service';
import { SessionService } from '../../services/session.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { SessionFormComponent } from '../modals/session-form/session-form.component';
import { SessionDeleteComponent } from '../modals/session-delete/session-delete.component';

@Component({
  selector: 'app-admin-session-report',
  templateUrl: './admin-session-report.component.html',
  styleUrls: ['./admin-session-report.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminSessionReportComponent implements OnInit {
  admin = this.adminService.state;
  sessions: Session[];
  dataSource: MatTableDataSource<Session>;
  displayedColumns: string[] = [
    'dealer',
    'session',
    'session_code',
    'instructor'
  ];
  pageIndex = 0;
  selectedSession: Session = new Session();
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
    public dialog: MatDialog,
    private adminService: AdminService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.getSessions();
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

  getSessions() {
    this.sessionService.getSessions()
      .subscribe(
        res => {
          this.sessions = res;
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
      this.sessions = this.dataSource.filteredData;
      this.pageIndex = 0;
      this.scrollTop();
      this.loading = false;
    }, 1000);
  }

  clearFilter() {
    this.filter = '';
    this.search(this.filter);
  }

  select(session) {
    this.selectedSession === session ? this.selectedSession = new Session() : this.selectedSession = session;
  }

  newSession() {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      data: new Session(),
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedSession = new Session();
          this.getSessions();
        }
      );
  }

  editSession(session) {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      data: session,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedSession = new Session();
          this.getSessions();
        }
      );
  }

  deleteSession(session) {
    const dialogRef = this.dialog.open(SessionDeleteComponent, {
      data: session,
      maxHeight: '90vh',
      maxWidth: '90vw',
      width: '768px'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          this.loading = true;
          this.selectedSession = new Session();
          this.getSessions();
        }
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
