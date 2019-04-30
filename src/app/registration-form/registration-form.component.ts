import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {UserService} from "../services/user.service";



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {


  constructor(private http: HttpClient, private api: UserService) {
  }

  user:Object ={
    nick: null,
    email: null,
    plainPassword: null,
    repeatPassword:null,
    name: null,
    age: null,
    city: null,
    sex: null,
    image: null
  }

  ngOnInit() {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }
  registerUser(){
    this.api.registerUser(this.user);
  }
  checkNick(){
    this.api.checkNick(this.user.nick);
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




