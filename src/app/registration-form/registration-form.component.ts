import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserParams, UserService} from "../services/user.service";

import { DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent{


  user:UserParams = new UserParams();
  constructor(private http: HttpClient, private api: UserService) {
  }

  errors : {email:'adres juz istnieje'};
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
      if(!reg.status) this.errors = reg.error;
    });
  }
  checkEmail(){
    this.api.checkEmail(this.user.email);
  }
  checkNick(){
    this.api.checkNick(this.user.nick);
  }
  checkPassword(){
    this.api.checkPassword(this.user.plainPassword);
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
     }
    fReader.readAsDataURL(file);
  }

}




