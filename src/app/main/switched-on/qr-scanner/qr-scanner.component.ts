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
    const urlString = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (urlString.test(ev)) {
      window.location = ev;
    } else {
      alert('This QR code scanner only accepts codes with a valid URL. Please scan another code.');
    }
  }
}
