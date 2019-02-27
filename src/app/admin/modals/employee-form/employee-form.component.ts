import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Employee } from '../../../services/classes';
import { EmployeeService } from '../../../services/employee.service';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = new Employee();
  employeeCache: Employee = new Employee();
  edit = false;
  changeDetected = false;
  noChanges = false;
  submitted = false;
  loading = false;
  success = false;
  kuidUsed = false;
  emailUsed = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .subscribe(
        res => this.closeDialog()
      );

    if (this.data._id) {
      this.employee = this.data;
      this.employeeCache = {...this.data};
      this.edit = true;
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.closeDialog();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (this.changeDetected && !this.success) {
      event.returnValue = false;
    }
  }

  createEmployee(data) {
    this.employeeService.createEmployee(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('create employee error')
      );
  }

  updateEmployee(data) {
    this.employeeService.updateEmployee(data)
      .subscribe(
        res => {
          this.success = true;
          this.loading = false;
        },
        err => this.showError('update employee error')
      );
  }

  validateEmployee(data) {
    this.employeeService.validateEmployee(data)
      .subscribe(
        res => {
          if (!res.kuidUsed) {
            if (!res.emailUsed) {
              if (!this.edit) {
                this.createEmployee(data);
              } else {
                this.updateEmployee(data);
              }
            } else {
              this.emailUsed = true;
              this.loading = false;
            }
          } else {
            this.kuidUsed = true;
            this.loading = false;
          }
        },
        err => this.showError('validate employee error')
      );
  }

  submit(data, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      if (!this.edit) {
        this.validateEmployee(data);
      } else {
        if (data.kuid === this.employeeCache.kuid && data.email === this.employeeCache.email) {
          if (data.first_name === this.employeeCache.first_name && data.last_name === this.employeeCache.last_name && data.dealer === this.employeeCache.dealer) {
            this.noChanges = true;
            this.loading = false;
          } else {
            this.updateEmployee(data);
          }
        } else {
          this.validateEmployee(data);
        }
      }
    }
    return false;
  }

  showError(msg) {
    console.log(msg);
    this.error = true;
    this.loading = false;
  }

  hideError() {
    this.kuidUsed = false;
    this.emailUsed = false;
    this.error = false;
  }

  changed() {
    this.changeDetected = true;
  }

  startOver() {
    this.employee = new Employee();
    this.submitted = false;
    this.hideError();
  }

  closeDialog() {
    if (this.changeDetected && !this.success) {
      if (confirm('These changes haven’t been submitted yet. Are you sure you want to leave?')) {
        this.dialogRef.close(this.employee);
      }
    } else {
      this.dialogRef.close(this.employee);
    }
  }
}
