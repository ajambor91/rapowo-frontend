import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from '../../services/user.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {MatDialog} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  constructor(
    private api: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private errorService: ErrorService
  ) {}
  submitted = false;
  submit = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  login(): void {
    this.submit = true;
    if(this.loginForm.invalid || this.submitted) {
      this.submitted = false;
      return;
    }
    this.submitted = true;
    this.submit = false;
    this.api.login(this.loginForm.value).subscribe(response => {
      if(response){
        this.submitted = false;
        this.router.navigate(['/']);
      }
    },
      error => {
      this.matDialog.open(NotificationDialogComponent,{
        width: '250px',
        data: this.errorService.errorMessageValue.value,
        panelClass: 'custom-modal'
      });
      this.submitted = false;
      });
  }
  get emailField(): AbstractControl {
    return this.loginForm.get('email');
  }
  get passwordField(): AbstractControl {
    return this.loginForm.get('password');
  }





}
