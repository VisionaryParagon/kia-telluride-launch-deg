import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsOnComparisonComponent } from './hands-on-comparison.component';

describe('HandsOnComparisonComponent', () => {
  let component: HandsOnComparisonComponent;
  let fixture: ComponentFixture<HandsOnComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsOnComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsOnComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
