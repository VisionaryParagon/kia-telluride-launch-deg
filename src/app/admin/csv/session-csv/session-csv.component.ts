import { Component, Input, Renderer } from '@angular/core';

import { Session } from '../../../services/classes';

@Component({
  selector: 'app-session-csv',
  templateUrl: './session-csv.component.html',
  styleUrls: ['./session-csv.component.scss']
})
export class SessionCsvComponent {
  @Input() data: Session[];
  @Input() sort: string;
  @Input() direction: string;
  headers: string[] = [];
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
      dealer: '',
      session: '',
      session_code: '',
      instructor: ''
    };
    const keys = Object.keys(headerObj);
    this.headers = [
      'Dealer Code',
      'Session',
      'Session Code',
      'Instructor'
    ];

    this.headers.forEach(h => {
      tabText += '"' + h + '",';
    });

    if (tabText.length > 0) {
      tabText = tabText.slice(0, -1);
      tabText += '\r\n';
    }

    this.data.sort((a, b) => {
      if (this.sort.length) {
        const x = a[this.sort];
        const y = b[this.sort];
        if (this.direction === 'desc') {
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        } else if (this.direction === 'asc') {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }).forEach(d => {
      keys.forEach(k => {
        if (d.hasOwnProperty(k) && d[k] != null) {
          tabText += '"' + d[k] + '",';
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
    this.renderer.setElementAttribute(anchor, 'download', 'session-data-' + Date.now() + '.csv');
    this.renderer.invokeElementMethod(anchor, 'click');
    this.renderer.invokeElementMethod(anchor, 'remove');
    this.loading = false;
  }
}
