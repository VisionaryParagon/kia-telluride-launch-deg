import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { UserGuardService } from '../services/user-guard.service';

// Main
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Pre-Session
import { PreSessionComponent } from './pre-session/pre-session.component';

// GameON
import { GameOnComponent } from './game-on/game-on.component';

// SwitchedON
import { SwitchedOnComponent } from './switched-on/switched-on.component';

// It'sON
import { ItsOnComponent } from './its-on/its-on.component';
import { ItsOnMainComponent } from './its-on/its-on-main/its-on-main.component';
import { HandsOnComparisonComponent } from './its-on/hands-on-comparison/hands-on-comparison.component';
import { HandsOnComparisonMainComponent } from './its-on/hands-on-comparison/hands-on-comparison-main/hands-on-comparison-main.component';
import { ExteriorComponent } from './its-on/hands-on-comparison/exterior/exterior.component';
import { FirstRowComponent } from './its-on/hands-on-comparison/first-row/first-row.component';
import { SecondThirdRowComponent } from './its-on/hands-on-comparison/second-third-row/second-third-row.component';
import { CargoComponent } from './its-on/hands-on-comparison/cargo/cargo.component';
import { StreetDriveComponent } from './its-on/street-drive/street-drive.component';

// RockON
import { RockOnComponent } from './rock-on/rock-on.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [UserGuardService],
    children: [
      {
        path: '',
        canActivateChild: [UserGuardService],
        children: [
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'pre-session',
            component: PreSessionComponent,
            data: {
              noteModule: 'Pre-Session'
            }
          },
          {
            path: 'game-on',
            component: GameOnComponent,
            data: {
              noteModule: 'GameON'
            }
          },
          {
            path: 'switched-on',
            component: SwitchedOnComponent,
            data: {
              noteModule: 'SwitchedON'
            }
          },
          {
            path: 'its-on',
            component: ItsOnComponent,
            data: {
              noteModule: 'It’sON'
            },
            children: [
              {
                path: '',
                component: ItsOnMainComponent
              },
              {
                path: 'hands-on-comparison',
                component: HandsOnComparisonComponent,
                children: [
                  {
                    path: '',
                    component: HandsOnComparisonMainComponent
                  },
                  {
                    path: 'exterior',
                    component: ExteriorComponent
                  },
                  {
                    path: 'first-row',
                    component: FirstRowComponent
                  },
                  {
                    path: 'second-third-rows',
                    component: SecondThirdRowComponent
                  },
                  {
                    path: 'cargo',
                    component: CargoComponent
                  }
                ]
              },
              {
                path: 'street-drive',
                component: StreetDriveComponent
              }
            ]
          },
          {
            path: 'rock-on',
            component: RockOnComponent,
            data: {
              noteModule: 'RockON'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
