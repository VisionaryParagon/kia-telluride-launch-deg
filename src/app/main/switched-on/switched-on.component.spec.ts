import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchedOnComponent } from './switched-on.component';

describe('SwitchedOnComponent', () => {
  let component: SwitchedOnComponent;
  let fixture: ComponentFixture<SwitchedOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchedOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchedOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
