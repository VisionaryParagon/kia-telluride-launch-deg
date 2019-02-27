import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDeleteComponent } from './session-delete.component';

describe('SessionDeleteComponent', () => {
  let component: SessionDeleteComponent;
  let fixture: ComponentFixture<SessionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
