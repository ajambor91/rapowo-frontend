import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{

  constructor(private http:HttpClient) { }
  nick:string = null;
  email:string = null;
  plainPassword:string= null;
  name:string = null;
  age:number = null;
  city:string = null;
  sex:number = null;
  image:string = null;

  registerUser(){
    this.http.post<User>(`${API_CONFIG.api}/security/register`,{"plainPassword":this.plainPassword, "email":this.email}).subscribe(resp=>{
      alert(resp);
    });
  }


}
