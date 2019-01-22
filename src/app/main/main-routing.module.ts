import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { UserGuardService } from '../services/user-guard.service';

// Main
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Pre-Session
import { PreGameComponent } from './pre-game/pre-game.component';

// GameON
import { GameOnComponent } from './game-on/game-on.component';

// It'sON
import { ItsOnComponent } from './its-on/its-on.component';
import { ItsOnMainComponent } from './its-on/its-on-main/its-on-main.component';
import { HandsOnComparisonComponent } from './its-on/hands-on-comparison/hands-on-comparison.component';
import { HandsOnComparisonMainComponent } from './its-on/hands-on-comparison/hands-on-comparison-main/hands-on-comparison-main.component';
import { ExteriorComponent } from './its-on/hands-on-comparison/exterior/exterior.component';
import { FrontRowComponent } from './its-on/hands-on-comparison/front-row/front-row.component';
import { SecondThirdRowComponent } from './its-on/hands-on-comparison/second-third-row/second-third-row.component';
import { CargoComponent } from './its-on/hands-on-comparison/cargo/cargo.component';
import { StreetDriveComponent } from './its-on/street-drive/street-drive.component';

// SwitchedON
import { SwitchedOnComponent } from './switched-on/switched-on.component';
import { SwitchedOnMainComponent } from './switched-on/switched-on-main/switched-on-main.component';
import { QrScannerComponent } from './switched-on/qr-scanner/qr-scanner.component';

// RockON
import { RockOnComponent } from './rock-on/rock-on.component';

// KeepON
import { KeepOnComponent } from './keep-on/keep-on.component';

// Evaluation
import { EvaluationComponent } from './evaluation/evaluation.component';

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
            path: 'pre-game',
            component: PreGameComponent,
            data: {
              noteModule: 'PreGame'
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
            },
            children: [
              {
                path: '',
                component: SwitchedOnMainComponent
              },
              {
                path: 'qr-scanner',
                component: QrScannerComponent
              }
            ]
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
                    path: 'front-row',
                    component: FrontRowComponent
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
          },
          {
            path: 'keep-on',
            component: KeepOnComponent,
            data: {
              noteModule: 'KeepON'
            }
          },
          {
            path: 'evaluation',
            component: EvaluationComponent
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
