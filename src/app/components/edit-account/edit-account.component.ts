import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user/user.model';
import {AuthService} from '../../services/auth-service';
import {FormBuilder, Validators} from '@angular/forms';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {UserService} from '../../services/user.service';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {MatDialog} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  // tslint:disable-next-line:max-line-length
  constructor(private errorService: ErrorService, private matDialog: MatDialog, private asyncValidator: AsyncValidator, private authService: AuthService, private formBuilder: FormBuilder, private matchPasswordValidator: PasswordValidator, private userService: UserService) {
    this.userBirthDate = null;
  }
  error = false;
  dataWasChange = false;
  user: User = this.authService.currentUserValue;
  editForm = this.formBuilder.group({
    nick: [this.user.nick, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/), this.asyncValidator.checkNick() ]],
    email: [this.user.email, [Validators.required, Validators.email, this.asyncValidator.checkEmail()]],
    passwords: this.formBuilder.group({
      password: ['', [Validators.pattern(/^[a-zA-Z0-9]{6,24}/)]],
      repeatPassword: ['']
    }, {
      validator: this.matchPasswordValidator.matchPasswords()
    }),
    avatar: this.formBuilder.group({
      path: [''],
      size: this.formBuilder.group({
        sizeX: [0],
        sizeY: [0]
      }),
      moved: this.formBuilder.group({
        moveX: [0],
        moveY: [0]
      }),
      removed: [false]
    }),
    name: [this.user.name || '', [Validators.pattern(/^[a-zA-Z0-9]/)]],
    city: [this.user.city || '', [Validators.pattern(/^[a-zA-Z]/)]],
    sex: [this.user.sex || ''],
    birthdate: []
  });
  set userBirthDate(date: null) {
    this.editForm.get('birthdate').setErrors(date);
  }
  buttonText = 'Zaaktualizuj profil!';
  submitted = false;
  updateAccount(event) {
    if (!event || this.submitted || this.editForm.invalid) {
      return;
    }
    this.submitted = true;
    this.userService.updateAccount(this.user.id, this.editForm.value).subscribe(
      response => {
        if (response.status) {
          this.dataWasChange = true;
          this.authService.editUser = response.data;
          this.submitted = false;
          this.authService.getUser();
          this.matDialog.open(NotificationDialogComponent, {
            data: {
              title: 'Suckes',
              desc: 'Konto zostało zaaktualizowane',
              type: null
            },
            panelClass: 'custom-modal'
          });
        }
      }, err => {
        this.error = true;
        this.submitted = false;
        this.matDialog.open(NotificationDialogComponent, {
          data: this.errorService.errorMessageValue.value,
          panelClass: 'custom-modal'
        });
        }
    );
  }
}
