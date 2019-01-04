import { Component, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { FadeAnimation, TopDownAnimation } from '../../../animations';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class QrScannerComponent implements OnInit {
  hasCameras: boolean;
  hasPermission: boolean;
  startScanning = false;
  selectedDevice: MediaDeviceInfo;
  scannedItems = [];

  @ViewChild('scanner') scanner: ZXingScannerComponent;

  constructor() { }

  ngOnInit() {
    this.initScanner();
  }

  initScanner() {
    this.scanner.camerasFound.subscribe(
      (devices: MediaDeviceInfo[]) => {
        this.hasCameras = true;

        // console.log('Devices: ', devices);

        // selects the devices's back camera by default
        for (const device of devices) {
          if (/back/gi.test(device.label)) {
            this.scanner.changeDevice(device);
            this.selectedDevice = device;
            this.startScanning = true;
            break;
          }
        }
      },
      err => this.hasCameras = false
    );

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      this.hasCameras = false;
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  handleQrCodeResult(ev) {
    // alert('Scan: ' + ev);
    window.location = ev;
  }
}
