import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './app-shared.module';
import { MainModule } from './main/main.module';

// Components
import { AppComponent } from './app.component';
import { KuidWarningComponent } from './main/modals/kuid-warning/kuid-warning.component';
import { LeaderboardComponent } from './main/modals/leaderboard/leaderboard.component';
import { NotesComponent } from './main/modals/notes/notes.component';
import { QuizComponent } from './main/modals/quiz/quiz.component';
import { ScannerComponent } from './main/modals/scanner/scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    KuidWarningComponent,
    LeaderboardComponent,
    NotesComponent,
    QuizComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppSharedModule,
    MainModule
  ],
  entryComponents: [
    KuidWarningComponent,
    LeaderboardComponent,
    NotesComponent,
    QuizComponent,
    ScannerComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
