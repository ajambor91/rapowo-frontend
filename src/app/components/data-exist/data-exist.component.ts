import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {User} from '../../model/user/user.model';
import {RegisterParams} from '../../model/user/register-params';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';

@Component({
  selector: 'app-data-exist',
  templateUrl: './data-exist.component.html',
  styleUrls: ['./data-exist.component.css']
})
export class DataExistComponent {
  submit = false;
  submitted = false;
  user: RegisterParams = JSON.parse(sessionStorage.getItem('tempUser'));
  constructor(private errorService: ErrorService, private matDialog: MatDialog, private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private asyncValidator: AsyncValidator) { }
  complementaryFormData = this.formBuilder.group({
    nick: ['', [Validators.required, this.asyncValidator.checkNick]],
    email: ['', [Validators.required, Validators.email, this.asyncValidator.checkEmail]]
  });
  get emailVal(): AbstractControl {
    return this.complementaryFormData.get('email');
  }
  get nickVal(): AbstractControl {
    return this.complementaryFormData.get('nick');
  }
  onSubmit(): void {
    console.log(this.complementaryFormData);
    this.submit = true;
    if(this.submitted || this.complementaryFormData.invalid){
      return;
    }
    this.submitted = true;
    this.user.email = this.emailVal.value;
    this.user.nick = this.nickVal.value;
    this.authService.loginWithAdditionalData(this.user, this.user.id).subscribe(resp => {
      this.router.navigate(['/']);
    }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        width: '250px',
        panelClass: 'custom-modal',
        data: this.errorService.errorMessageValue.value
      })
    })
  }

}
