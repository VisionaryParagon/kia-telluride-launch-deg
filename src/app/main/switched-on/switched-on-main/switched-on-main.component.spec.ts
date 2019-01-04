import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchedOnMainComponent } from './switched-on-main.component';

describe('SwitchedOnMainComponent', () => {
  let component: SwitchedOnMainComponent;
  let fixture: ComponentFixture<SwitchedOnMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchedOnMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchedOnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
