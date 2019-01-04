import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class PreGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
