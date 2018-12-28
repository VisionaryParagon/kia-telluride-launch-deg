import { Component, OnInit } from '@angular/core';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
