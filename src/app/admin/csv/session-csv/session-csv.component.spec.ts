import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCsvComponent } from './session-csv.component';

describe('SessionCsvComponent', () => {
  let component: SessionCsvComponent;
  let fixture: ComponentFixture<SessionCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
