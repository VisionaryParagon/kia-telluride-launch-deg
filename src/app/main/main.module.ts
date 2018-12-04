import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { MainRoutingModule } from './main-routing.module';

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

@NgModule({
  imports: [
    AppSharedModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    PreSessionComponent,
    GameOnComponent,
    SwitchedOnComponent,
    ItsOnComponent,
    ItsOnMainComponent,
    HandsOnComparisonComponent,
    HandsOnComparisonMainComponent,
    ExteriorComponent,
    FirstRowComponent,
    SecondThirdRowComponent,
    CargoComponent,
    StreetDriveComponent,
    RockOnComponent
  ]
})
export class MainModule { }
