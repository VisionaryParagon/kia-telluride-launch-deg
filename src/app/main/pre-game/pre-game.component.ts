import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { ScannerComponent } from '../modals/scanner/scanner.component';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PreGameComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openScanner() {
    const dialogRef = this.dialog.open(ScannerComponent, {
      height: '90vh',
      maxWidth: '90vw',
      width: '90vw'
    });

    dialogRef.afterClosed()
      .subscribe(
        data => {
          // console.log('Updated user:', data);
        }
      );
  }
}
