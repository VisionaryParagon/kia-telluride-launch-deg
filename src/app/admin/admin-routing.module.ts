import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Guards
import { AdminGuardService } from '../services/admin-guard.service';
import { AdminLoginGuardService } from '../services/admin-login-guard.service';

// Main
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminReportComponent } from './admin-report/admin-report.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'report',
        component: AdminReportComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [AdminLoginGuardService]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
