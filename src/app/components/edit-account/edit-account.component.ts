import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user/user.model';
import {AuthService} from '../../services/auth-service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {UserService} from '../../services/user.service';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {Birthdate} from '../../model/helper/birthdate';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  constructor(private asyncValidator: AsyncValidator, private authService: AuthService, private formBuilder: FormBuilder, private matchPasswordValidator: PasswordValidator, private userService: UserService) {
    this.userBirthDate = null;
  }
  error = false;
  dataWasChange = false;
  user: User = this.authService.currentUserValue;
  editForm = this.formBuilder.group({
    nick: [this.user.nick, [Validators.pattern(/^[a-zA-Z0-9]/), this.asyncValidator.checkNick() ]],
    email: [this.user.email, [Validators.email, this.asyncValidator.checkEmail()]],
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
      })
    }),
    name: [this.user.name, [Validators.pattern(/^[a-zA-Z0-9]/)]],
    city: [this.user.city, [Validators.pattern(/^[a-zA-Z]/)]],
    sex: [this.user.sex],
    birthdate: []
  });
  set userBirthDate(date: null) {
    this.editForm.get('birthdate').setErrors(date);
  }

  get userFromEditForm(): User {
    const birthdate = this.editForm.get('birthdate').value;
    const date = ((birthdate: Birthdate): string => {
      const day = birthdate.day < 10 ? `0${birthdate.day}` : birthdate.day;
      const month = birthdate.month < 10 ? `0${birthdate.month}` : birthdate.month;
      const year = birthdate.year;
      return `${day}.${month}.${year}`;
    })(birthdate);
    const timestamp = ((birthdate: Birthdate): number => {
      const date = `${birthdate.month}.${birthdate.day}.${birthdate.year}`;
      const dateObject = new Date(date);
      return Math.floor(dateObject.getTime() / 1000);
    })(birthdate);
    const user: User = this.user;
    user.email = this.editForm.get('email').value;
    user.name = this.editForm.get('name').value;
    user.nick = this.editForm.get('nick').value;
    user.sex = this.editForm.get('sex').value;
    user.city = this.editForm.get('city').value;
    user.birthdate = date;
    user.timestamp = timestamp;
    return this.user;
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
          const user = this.userFromEditForm;
          this.authService.editUser = user;
          this.submitted = false;
          this.authService.getUser();

        }
      }, err => {
          if (!err.status) {
            this.error = true;
            this.submitted = false;
          }
        }
    );
  }
}
