import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsOnMainComponent } from './its-on-main.component';

describe('ItsOnMainComponent', () => {
  let component: ItsOnMainComponent;
  let fixture: ComponentFixture<ItsOnMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItsOnMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsOnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
