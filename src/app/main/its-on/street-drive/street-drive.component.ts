import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-street-drive',
  templateUrl: './street-drive.component.html',
  styleUrls: ['./street-drive.component.scss'],
  animations: [ FadeAnimation ]
})
export class StreetDriveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
