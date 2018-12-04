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
import { NotesComponent } from './modals/notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    KuidWarningComponent,
    NotesComponent
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
    NotesComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
