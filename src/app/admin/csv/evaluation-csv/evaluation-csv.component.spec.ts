import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCsvComponent } from './evaluation-csv.component';

describe('EvaluationCsvComponent', () => {
  let component: EvaluationCsvComponent;
  let fixture: ComponentFixture<EvaluationCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
