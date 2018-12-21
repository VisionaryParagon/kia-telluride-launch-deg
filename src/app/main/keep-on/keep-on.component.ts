import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-keep-on',
  templateUrl: './keep-on.component.html',
  styleUrls: ['./keep-on.component.scss'],
  animations: [ FadeAnimation ]
})
export class KeepOnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
