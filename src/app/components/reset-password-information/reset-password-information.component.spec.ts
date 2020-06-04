import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordInformationComponent } from './reset-password-information.component';

describe('ResetPasswordInformationComponent', () => {
  let component: ResetPasswordInformationComponent;
  let fixture: ComponentFixture<ResetPasswordInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
