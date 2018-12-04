import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-pre-session',
  templateUrl: './pre-session.component.html',
  styleUrls: ['./pre-session.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PreSessionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
