import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvalReportComponent } from './admin-eval-report.component';

describe('AdminEvalReportComponent', () => {
  let component: AdminEvalReportComponent;
  let fixture: ComponentFixture<AdminEvalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEvalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
