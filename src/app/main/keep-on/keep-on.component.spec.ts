import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepOnComponent } from './keep-on.component';

describe('KeepOnComponent', () => {
  let component: KeepOnComponent;
  let fixture: ComponentFixture<KeepOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
