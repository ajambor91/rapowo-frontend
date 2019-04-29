import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {

  constructor(private http: HttpClient) {
  }

  nick: string = null;
  email: string = null;
  plainPassword: string = null;
  repeatPassword:string = null;
  name: string = null;
  age: number = null;
  city: string = null;
  sex: number = null;
  image: any = null;
  validation:Object = {
    email: true,
    nick: true,
    password: true,
    repeatPassword: true
  };
  ngOnInit() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }
  checkEmail(){
    this.http.post(`${API_CONFIG.api}/security/check-email`, {
      'email':this.email
    }).subscribe( resp =>{
      if(resp.status != true){
        this.validation.email= false;

      }else{
        this.validation.email= true;

      }
      this.checkFields();
    });
  }
  checkNick(){
    this.http.post(`${API_CONFIG.api}/security/check-nick`, {
      'nick':this.nick
    }).subscribe( resp =>{
      if(resp.status != true){
        this.validation.nick = false;

      }else{
        this.validation.nick = true;

      }
      this.checkFields();
    });
  }
  checkPassword(){
    let pattern = /[A-Za-z0-9]{5,24}/g;
    let checkPassword = pattern.test(this.plainPassword);

    if(checkPassword != false){
      this.validation.password = true;
    }
    else{
      this.validation.password = false;
    }
    this.checkFields();
  }
  checkRepeatPassword(){
    if(this.plainPassword === this.repeatPassword){
      this.validation.repeatPassword = true;
    }else{
      this.validation.repeatPassword = false;
    }
    this.checkFields();
  }
  registerUser() {

    this.http.post(`${API_CONFIG.api}/security/register`, {
      "plainPassword": this.plainPassword,
      "email": this.email,
      "nick":this.nick,
      "name":this.name,
      "age":this.age,
      "city":this.city,
      "sex":this.sex,
      "image":this.image

    }).subscribe(resp => {
    });
  }
  checkFields(){

    let check;
    let submit = document.getElementById('submit');
    for(let i in this.validation){
      if(this.validation[i] == true){
        check = true;
      }
      else{
        check = false;
        break;
      }
    }
    if((this.email == '' || this.email == null) || (this.nick == '' || this.nick == null) || (this.plainPassword == '' || this.plainPassword == null)   ){
      check = false;
    }
    if(check == false){
      submit.disabled = true;
    }
    else{
      submit.disabled = false;
    }
  }
  handleDropImage(event) {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    console.log(file);
    let avatar = document.getElementById('avatar');
    avatar.src = URL.createObjectURL(file);
    this.image = file;
  }

  getInputFile(event) {
    let file = event.target.files;
    let fReader = new FileReader();
    fReader.onload = () => {
      let avatar = document.getElementById('avatar');
      avatar.src = fReader.result;
    };
    fReader.readAsDataURL(file[0]);
    this.image = file;
  }

}




