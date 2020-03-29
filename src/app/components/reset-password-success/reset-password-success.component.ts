import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../services/error-service';

@Component({
  selector: 'app-reset-password-success',
  templateUrl: './reset-password-success.component.html',
  styleUrls: ['./reset-password-success.component.css']
})
export class ResetPasswordSuccessComponent {
  timer = 10;
  userExist: boolean;
  submitted = false;
  submit = false;
  hash: string;
  resetPasswordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,24}/)]],
    repeatPassword: ['', Validators.required]
  }, {
    validators: this.passwordValidator.matchPasswords()
  });
  constructor(private errorService: ErrorService, private matDialog: MatDialog, private passwordValidator: PasswordValidator, private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe( param => {this.hash = param.get('hash'); });
    this.userService.getUserByHash(this.hash).subscribe( resp => {
      this.userExist = true;
    },
    error => {
      this.userExist = false;
      this.noUser();
    });
  }
  get passwordField(): AbstractControl {
    return this.resetPasswordForm.get('password');
  }
  get repeatPasswordField(): AbstractControl {
    return this.resetPasswordForm.get('repeatPassword');
  }
  noUser() {
    if (!this.userExist) {
      setInterval(() => {
        this.timer --;
        if (this.timer === 0) {
          this.router.navigate(['/']);
          return;
        }
      }, 1000);
    }
  }
  resetPass() {
    this.submit = true;
    if (this.resetPasswordForm.invalid || this.submitted) {
      return;
    }
    this.submitted = true;
    this.userService.resetPasswordReq(this.resetPasswordForm.value, this.hash).subscribe( resp => {
      this.matDialog.open(NotificationDialogComponent, {
        data: {
          tile: 'Suckes!',
          desc: 'Hasło zostało zresetowane'
        },
        panelClass: 'custom-modal',
        width: '250px'
      });
      this.matDialog.afterAllClosed.subscribe(resp=>{
        this.router.navigate(['/login']);
        return;
      });
    }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        width: '250px',
        data: this.errorService.errorMessageValue.value,
        panelClass: 'custom-modal'
      });
      this.submitted = false;
      this.submit = false;
    });
  }


}
