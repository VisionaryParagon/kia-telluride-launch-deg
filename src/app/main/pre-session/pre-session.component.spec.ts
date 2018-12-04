import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSessionComponent } from './pre-session.component';

describe('PreSessionComponent', () => {
  let component: PreSessionComponent;
  let fixture: ComponentFixture<PreSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
