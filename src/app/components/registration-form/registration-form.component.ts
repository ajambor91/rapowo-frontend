import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserService} from '../../services/user.service';

import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {DatepickerModel} from '../../model/helper/datepicker-model';
import {Router} from '@angular/router';
import {Avatar} from '../../model/helper/avatar';
import {AvatarMove} from '../../model/helper/avatar-move';
import {AvatarSize} from '../../model/helper/avatar-size';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],

})

export class RegistrationFormComponent {


  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private api: UserService, private formBuilder: FormBuilder, private passwordValidator: PasswordValidator, private asyncValidator: AsyncValidator, private router: Router) {

  }

  today: Date = new Date();
  datepicker: DatepickerModel = {
    minDate: {
      year: 1950,
      month: 1,
      day: 1,
    },
    maxDate: {
      year: this.today.getFullYear() - 13,
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    }
  };
  submit = false;
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
  get form(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  get passwords(): AbstractControl {
    return this.registerForm.get('passwords');
  }
  set avatarSize(size: AvatarSize) {
    this.registerForm.get('avatar').get('size').setValue(size);
  }
  set avatarMoved(moved: AvatarMove) {
    this.registerForm.get('avatar').get('moved').setValue(moved);
  }
  set avatarPath(path: string) {
    this.registerForm.get('avatar').get('path').setValue(path);
  }
  addAvatar(avatar: Avatar): void {
    if (!avatar.path) {
      return;
    }
    const size: AvatarSize = {
      sizeX: avatar.sizeX,
      sizeY: avatar.sizeY
    };
    const moved: AvatarMove = {
      moveX: avatar.moveX,
      moveY: avatar.moveY
    };
    const path = avatar.path;
    this.avatarSize = size;
    this.avatarMoved = moved;
    this.avatarPath = path;
  }

  registerUser(): void {
    console.log(this.registerForm)
    this.submit = true;
    if(this.registerForm.invalid || this.submitted){
      return;
    }
    this.submitted = true;
    this.api.registerUser(this.registerForm.value).subscribe(response => {
      if(response.status){
        this.router.navigate(['registry-success']);
      }
    });
  }

}




