import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontRowComponent } from './front-row.component';

describe('FrontRowComponent', () => {
  let component: FrontRowComponent;
  let fixture: ComponentFixture<FrontRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
