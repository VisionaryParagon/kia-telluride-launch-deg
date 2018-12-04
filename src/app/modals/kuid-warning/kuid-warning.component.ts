import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-kuid-warning',
  templateUrl: './kuid-warning.component.html',
  styleUrls: ['./kuid-warning.component.scss']
})
export class KuidWarningComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<KuidWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

}
