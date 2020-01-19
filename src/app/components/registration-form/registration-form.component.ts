import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserService} from '../../services/user.service';

import {FormBuilder, Validators} from '@angular/forms';
import {PasswordValidator} from '../../helpers/validators/password-validator';
import {AsyncValidator} from '../../helpers/validators/async-validator';
import {DatepickerModel} from '../../model/helper/datepicker-model';
import {Router} from '@angular/router';

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
    name: ['', Validators.pattern(/[a-zA-Z]{3,48}/)]
  });
  get form(){
    return this.registerForm.controls;
  }
  get passwords(){
    return this.registerForm.get('passwords');
  }
  imagePath: string = null;

  ngOnInit() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }
  registerUser() {
    this.submit = true;
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      return;
    }
    this.api.registerUser(this.registerForm.value).subscribe(response => {
      if(response.status){
        this.router.navigate(['registry-success']);
      }
    });
  }
  handleDropImage(event) {

    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.showImage(file);

  }

  getInputFile(event) {
    const file = event.target.files[0];
    this.showImage(file);


  }
  showImage(file) {
     const fReader = new FileReader();
     fReader.onload = () => {
       this.imagePath = fReader.result.toString();
       // this.user.image = this.imagePath;
     };
     fReader.readAsDataURL(file);

  }

}




