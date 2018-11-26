import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RockOnComponent } from './rock-on.component';

describe('RockOnComponent', () => {
  let component: RockOnComponent;
  let fixture: ComponentFixture<RockOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RockOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RockOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
