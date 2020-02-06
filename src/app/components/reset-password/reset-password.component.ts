import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ValueConverter} from '@angular/compiler/src/render3/view/template';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../services/error-service';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private router: Router, private errorService: ErrorService, private userService: UserService, private formBuilder: FormBuilder, private matDialog: MatDialog) { }
  submit = false;
  submitted = false;
  resetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  get emailField(): AbstractControl {
    return this.resetPasswordForm.get('email');
  }

  submitForm(): void {
    this.submit = true;
    console.log(this.resetPasswordForm);
    if(this.resetPasswordForm.invalid || this.submitted){
      this.submitted = false;
      return;
    }
    this.submit = false;
    this.submitted = true;
    this.userService.resetPassword(this.resetPasswordForm.value).subscribe(
      resp => {
        this.router.navigate(['/reset-password-info']);
      },
      error => {
        this.matDialog.open(NotificationDialogComponent,{
          width: '250px',
          panelClass: 'custom-modal',
          data: this.errorService.errorMessageValue.value
        });
        this.submitted = false;
      }
    );
  }


}
