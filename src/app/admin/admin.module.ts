import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Main
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminReportComponent } from './admin-report/admin-report.component';

// Modals
import { SessionsComponent } from './modals/sessions/sessions.component';
import { PointsComponent } from './modals/points/points.component';
import { UserFormComponent } from './modals/user-form/user-form.component';
import { UserDeleteComponent } from './modals/user-delete/user-delete.component';

// CSV components
import { UserCsvComponent } from './csv/user-csv/user-csv.component';

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
    SessionsComponent,
    PointsComponent,
    UserFormComponent,
    UserDeleteComponent,
    UserCsvComponent
  ],
  entryComponents: [
    SessionsComponent,
    PointsComponent,
    UserFormComponent,
    UserDeleteComponent
  ]
})
export class AdminModule { }
