import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../animations';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  animations: [ FadeAnimation ]
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
