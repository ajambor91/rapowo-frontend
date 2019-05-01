import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Errors, UserParams, UserService} from '../services/user.service';

import { DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent{

  test:boolean = false;
  user:UserParams = new UserParams();
  errors:Errors = new Errors();
  constructor(private http: HttpClient, private api: UserService) {
  }

  imagePath:String = null;

  ngOnInit() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }
  registerUser(){
    console.log(this.user);
    this.api.registerUser(this.user).subscribe(reg => {

    });
  }
  checkEmail(){
    if(this.user.email != '') {
      this.api.checkEmail(this.user.email).subscribe(email => {
        if (!email.status) this.errors.email = email.error;
        else this.errors.email = null;
      });
    }else{
      this.errors.email = 'Pole jest obowiązkowe!';
    }
  }
  checkNick() {
    if (this.user.nick != '') {
      this.api.checkNick(this.user.nick).subscribe(nick => {
        if (!nick.status) this.errors.nick = nick.error;
        else this.errors.nick = null;
      });
    } else {
      this.errors.nick = 'Pole jest obowiązkowe!';
    }
  }
  checkPassword(){
    if(this.user.plainPassword != '') {
      let pattern = /[a-zA-Z]{1,}[0-9]{1,}/;
      if (!pattern.test(this.user.plainPassword)) this.errors.plainPassword = 'Hasło powinno mieć 6 znaków w tym litery i cyfry';
      else this.errors.plainPassword = null;
    }
    else{
      this.errors.plainPassword = 'Pole jest obowiązkowe!';
    }
  }
  checkRepeatPassword(){
    if(this.user.repeatPassword != '') {
      if (this.user.plainPassword != this.user.repeatPassword) this.errors.repeatPassword = 'Hasła się różnią';
      else this.errors.repeatPassword = null;
    }
    else {
      this.errors.repeatPassword = 'Pole jest obowiązkowe!';
    }
  }
  checkFields(){
    let check = true;
    for(let i in this.errors){
      if(this.errors[i] != null){
        check = true;
        break;
      }else check = false;
    }
    return check;
  }
  handleDropImage(event) {

    event.preventDefault();
    let file = event.dataTransfer.files[0];
    this.showImage(file);

  }

  getInputFile(event) {
    let file = event.target.files[0];
    this.showImage(file);


  }
  showImage(file){
     let fReader = new FileReader();
     fReader.onload = () =>{
       this.imagePath = fReader.result.toString();
       this.user.image = this.imagePath;
     }
    fReader.readAsDataURL(file);

  }

}




