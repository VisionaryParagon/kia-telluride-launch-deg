import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretDown,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faPlus,
  faSearch,
  faTimes,
  faTrashAlt,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

import { CookieModule } from 'ngx-cookie';

// Directives

// Icons for fontawesome library
library.add(faCaretDown);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faEdit);
library.add(faPlus);
library.add(faSearch);
library.add(faTimes);
library.add(faTrashAlt);
library.add(faTrophy);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    CookieModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    CookieModule
  ]
})
export class AppSharedModule { }
