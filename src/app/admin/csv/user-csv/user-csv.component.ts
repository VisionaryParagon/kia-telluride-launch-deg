import { Component, Input, Renderer } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

import { User } from '../../../services/classes';

class DateTimePipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'MMMM d, y, h:mm:ss a');
  }
}

@Component({
  selector: 'app-user-csv',
  templateUrl: './user-csv.component.html',
  styleUrls: ['./user-csv.component.scss']
})
export class UserCsvComponent {
  @Input() data: User[];
  headers: string[] = [];
  fileName = 'user-data-' + Date.now() + '.csv';
  loading = false;

  constructor(
    private renderer: Renderer
  ) { }

  build() {
    this.loading = true;

    if (!this.data.length) {
      console.error('Data not available.');
      alert('Data not available.');
      this.loading = false;
      return;
    }

    this.buildDownloader(this.construct());
  }

  private construct(): string {
    let tabText = '';
    const headerObj = {
      kuid: '',
      first_name: '',
      last_name: '',
      email: '',
      dealer: '',
      session: '',
      team: '',
      instructor: '',
      certScore: '',
      session_code: '',
      transcript_id: '',
      created: '',
      modified: ''
    };
    const keys = Object.keys(headerObj);
    this.headers = [
      'KUID',
      'First Name',
      'Last Name',
      'Email',
      'Dealer Code',
      'Session',
      'Team',
      'Instructor',
      'Certification Test Score',
      'Session Code',
      'Transcript ID',
      'Created Date',
      'Modified Date'
    ];

    this.headers.forEach(h => {
      tabText += '"' + h + '",';
    });

    if (tabText.length > 0) {
      tabText = tabText.slice(0, -1);
      tabText += '\r\n';
    }

    this.data.sort((a, b) => {
      const x = a['modified'];
      const y = b['modified'];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }).forEach(d => {
      keys.forEach(k => {
        if (d.hasOwnProperty(k) && d[k] != null) {
          if (moment(d[k], moment.ISO_8601, true).isValid()) {
            const pipe = new DateTimePipe('en-US');
            tabText += '"' + pipe.transform(d[k]) + '",';
          } else {
            tabText += '"' + d[k] + '",';
          }
        } else {
          tabText += '"",';
        }
      });

      tabText = tabText.slice(0, -1);
      tabText += '\r\n';
    });

    return tabText;
  }

  private buildDownloader(data) {
    const bomData = '\ufeff' + data;
    const csvData = new Blob([bomData], {type: 'text/csv;charset=UTF-8'});
    const csvUrl = window.URL.createObjectURL(csvData);
    const anchor = this.renderer.createElement(document.body, 'a');

    this.renderer.setElementStyle(anchor, 'visibility', 'hidden');
    this.renderer.setElementAttribute(anchor, 'href', csvUrl);
    this.renderer.setElementAttribute(anchor, 'target', '_blank');
    this.renderer.setElementAttribute(anchor, 'download', this.fileName);
    this.renderer.invokeElementMethod(anchor, 'click');
    this.renderer.invokeElementMethod(anchor, 'remove');
    this.loading = false;
  }
}
