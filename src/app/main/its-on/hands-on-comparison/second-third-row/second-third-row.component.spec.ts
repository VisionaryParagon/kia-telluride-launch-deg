import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondThirdRowComponent } from './second-third-row.component';

describe('SecondThirdRowComponent', () => {
  let component: SecondThirdRowComponent;
  let fixture: ComponentFixture<SecondThirdRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondThirdRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondThirdRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
