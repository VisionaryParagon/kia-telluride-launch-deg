import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../animations';

@Component({
  selector: 'app-its-on-main',
  templateUrl: './its-on-main.component.html',
  styleUrls: ['./its-on-main.component.scss'],
  animations: [ FadeAnimation ]
})
export class ItsOnMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
