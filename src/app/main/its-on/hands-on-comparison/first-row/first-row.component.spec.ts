import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRowComponent } from './first-row.component';

describe('FirstRowComponent', () => {
  let component: FirstRowComponent;
  let fixture: ComponentFixture<FirstRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
