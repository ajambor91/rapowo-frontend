import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVerifyDialogComponent } from './password-verify-dialog.component';

describe('PasswordVerifyDialogComponent', () => {
  let component: PasswordVerifyDialogComponent;
  let fixture: ComponentFixture<PasswordVerifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordVerifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
