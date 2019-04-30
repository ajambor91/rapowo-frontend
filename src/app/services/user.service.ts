import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';
interface checkEmailResponse {
  status: boolean;
}
interface checkNickResponse{
  status: boolean;
}
interface checkPasswordResponse{
  status: boolean;
}
interface validation {
  email: boolean,
  nick: boolean,
  password: boolean,
  repeatPassword: boolean
}
@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }
  checkEmail(){
    this.http.post<checkEmailResponse>(`${API_CONFIG.api}/security/check-email`, {
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
  checkNick(nick){
    this.http.post<checkNickResponse>(`${API_CONFIG.api}/security/check-nick`, {
      'nick':nick
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
    this.http.post<checkPasswordResponse>(`${API_CONFIG.api}/security/check-password`, {
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
  checkRepeatPassword(){
    if(this.plainPassword === this.repeatPassword){
      this.validation.repeatPassword = true;
    }else{
      this.validation.repeatPassword = false;
    }
    this.checkFields();
  }
  registerUser(params) {

    this.http.post(`${API_CONFIG.api}/security/register`, params).subscribe(resp => {
    });
  }

}
