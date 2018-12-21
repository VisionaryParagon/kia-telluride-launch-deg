import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KuidWarningComponent } from './kuid-warning.component';

describe('KuidWarningComponent', () => {
  let component: KuidWarningComponent;
  let fixture: ComponentFixture<KuidWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuidWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuidWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
