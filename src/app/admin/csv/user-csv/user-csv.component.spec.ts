import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCsvComponent } from './user-csv.component';

describe('UserCsvComponent', () => {
  let component: UserCsvComponent;
  let fixture: ComponentFixture<UserCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
