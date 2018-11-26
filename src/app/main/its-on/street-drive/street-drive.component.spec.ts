import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDriveComponent } from './street-drive.component';

describe('StreetDriveComponent', () => {
  let component: StreetDriveComponent;
  let fixture: ComponentFixture<StreetDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
