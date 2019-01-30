import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faCaretDown,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faFileExport,
  faPlus,
  faSearch,
  faTimes,
  faTrashAlt,
  faTrophy,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { CookieModule } from 'ngx-cookie';

// Directives
import { UppercaseInputDirective } from './directives/uppercase-input/uppercase-input.directive';

// Pipes
import { NoBreakSpacePipe } from './pipes/no-break-space.pipe';

// Icons for fontawesome library
library.add(faAngleDown);
library.add(faCaretDown);
library.add(faCheck);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faEdit);
library.add(faFileExport);
library.add(faPlus);
library.add(faSearch);
library.add(faTimes);
library.add(faTrashAlt);
library.add(faTrophy);
library.add(faUserPlus);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    NgxChartsModule,
    ZXingScannerModule,
    CookieModule.forRoot()
  ],
  declarations: [
    UppercaseInputDirective,
    NoBreakSpacePipe
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    NgxChartsModule,
    ZXingScannerModule,
    CookieModule,
    UppercaseInputDirective,
    NoBreakSpacePipe
  ]
})
export class AppSharedModule { }
