import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  constructor(private errorService: ErrorService, private dialog: MatDialog, private http: HttpClient, private api: UserService, private formBuilder: FormBuilder, private passwordValidator: PasswordValidator, private asyncValidator: AsyncValidator, private router: Router) {
  }
  buttonText = "Zarejestruj się!";
  submitted = false;
  registerForm = this.formBuilder.group({
    nick: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{3,48}/), this.asyncValidator.checkNick()]],
    email: ['', [Validators.required, Validators.email, this.asyncValidator.checkEmail()]],
    passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern(/[a-z]/)]], // TODO
        repeatPassword: ['', [Validators.required]],
      }, {
        validator: this.passwordValidator.matchPasswords()
      }
    ),
    city: ['', Validators.pattern(/[a-zA-Z]{3,48}/)],
    sex: [''],
    birthdate: [null],
    name: ['', Validators.pattern(/[a-zA-Z]{3,48}/)],
    avatar: this.formBuilder.group({
      path: [''],
      size: this.formBuilder.group({
        sizeX: [''],
        sizeY: [''],
      }),
      moved: this.formBuilder.group({
        moveX: [''],
        moveY: ['']
      })
    })
  });

  registerUser(event: any): void {
    if(!event){
      return;
    }
    console.log(this.registerForm)
    if(this.registerForm.invalid || this.submitted){
      return;
    }
    this.submitted = true;
    this.api.registerUser(this.registerForm.value).subscribe(response => {
      if(response.status){
        this.router.navigate(['registry-success']);
      }
    },
      error => {
      this.submitted = false;
      const dialog = this.dialog.open(NotificationDialogComponent, {
         width: '250px',
        panelClass: 'custom-modal',
        data: this.errorService.errorMessageValue.value
      });
      });
  }
}
