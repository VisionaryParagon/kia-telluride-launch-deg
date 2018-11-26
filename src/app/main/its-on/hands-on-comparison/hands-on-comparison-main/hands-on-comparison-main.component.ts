import { Component, OnInit } from '@angular/core';

import { FadeAnimation } from '../../../../animations';

@Component({
  selector: 'app-hands-on-comparison-main',
  templateUrl: './hands-on-comparison-main.component.html',
  styleUrls: ['./hands-on-comparison-main.component.scss'],
  animations: [ FadeAnimation ]
})
export class HandsOnComparisonMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
