import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsOnComparisonMainComponent } from './hands-on-comparison-main.component';

describe('HandsOnComparisonMainComponent', () => {
  let component: HandsOnComparisonMainComponent;
  let fixture: ComponentFixture<HandsOnComparisonMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsOnComparisonMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsOnComparisonMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
