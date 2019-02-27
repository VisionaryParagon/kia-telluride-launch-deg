import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Main
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminEvalReportComponent } from './admin-eval-report/admin-eval-report.component';
import { AdminSessionReportComponent } from './admin-session-report/admin-session-report.component';
import { AdminEmployeeReportComponent } from './admin-employee-report/admin-employee-report.component';

// Modals
import { SessionsComponent } from './modals/sessions/sessions.component';
import { PointsComponent } from './modals/points/points.component';
import { UserFormComponent } from './modals/user-form/user-form.component';
import { UserDeleteComponent } from './modals/user-delete/user-delete.component';
import { SessionFormComponent } from './modals/session-form/session-form.component';
import { SessionDeleteComponent } from './modals/session-delete/session-delete.component';
import { EmployeeFormComponent } from './modals/employee-form/employee-form.component';
import { EmployeeDeleteComponent } from './modals/employee-delete/employee-delete.component';

// CSV components
import { UserCsvComponent } from './csv/user-csv/user-csv.component';
import { EvaluationCsvComponent } from './csv/evaluation-csv/evaluation-csv.component';
import { SessionCsvComponent } from './csv/session-csv/session-csv.component';
import { EmployeeCsvComponent } from './csv/employee-csv/employee-csv.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminReportComponent,
    AdminEvalReportComponent,
    AdminSessionReportComponent,
    AdminEmployeeReportComponent,
    SessionsComponent,
    PointsComponent,
    UserFormComponent,
    UserDeleteComponent,
    SessionFormComponent,
    SessionDeleteComponent,
    EmployeeFormComponent,
    EmployeeDeleteComponent,
    UserCsvComponent,
    EvaluationCsvComponent,
    SessionCsvComponent,
    EmployeeCsvComponent
  ],
  entryComponents: [
    SessionsComponent,
    PointsComponent,
    UserFormComponent,
    UserDeleteComponent,
    SessionFormComponent,
    SessionDeleteComponent,
    EmployeeFormComponent,
    EmployeeDeleteComponent
  ]
})
export class AdminModule { }
