import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsOnComponent } from './its-on.component';

describe('ItsOnComponent', () => {
  let component: ItsOnComponent;
  let fixture: ComponentFixture<ItsOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
