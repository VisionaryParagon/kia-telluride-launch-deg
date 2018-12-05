import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './app-shared.module';
import { MainModule } from './main/main.module';

// Components
import { AppComponent } from './app.component';
import { KuidWarningComponent } from './modals/kuid-warning/kuid-warning.component';
import { LeaderboardComponent } from './modals/leaderboard/leaderboard.component';
import { NotesComponent } from './modals/notes/notes.component';
import { QuizComponent } from './modals/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    KuidWarningComponent,
    LeaderboardComponent,
    NotesComponent,
    QuizComponent
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
    QuizComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
