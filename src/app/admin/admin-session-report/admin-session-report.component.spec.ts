import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionReportComponent } from './admin-session-report.component';

describe('AdminSessionReportComponent', () => {
  let component: AdminSessionReportComponent;
  let fixture: ComponentFixture<AdminSessionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSessionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSessionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
