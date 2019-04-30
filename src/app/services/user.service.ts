import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';
import {Observable} from "rxjs";
class checkEmailResponse {
  status: boolean;
}
class checkNickResponse{
  status: boolean;
}
class checkPasswordResponse{
  status: boolean;
}
class registerUserResponse {
  status:boolean;
  error: [];
}
export class UserParams{

  nick: String;
  email: String;
  plainPassword: String;
  repeatPassword:String;
  name: String;
  age: String;
  city: String;
  sex: String;
  image: String;
}
@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }
  checkEmail(email){
    this.http.post<checkEmailResponse>(`${API_CONFIG.api}/security/check-email`, {
      'email':email
    });
  }
  checkNick(nick){
    this.http.post<checkNickResponse>(`${API_CONFIG.api}/security/check-nick`, {
      'nick':nick
    }).subscribe( resp =>{
      if(resp.status != true){


      }else{


      }

    });
  }
  checkPassword(plainPassword){
    this.http.post<checkPasswordResponse>(`${API_CONFIG.api}/security/check-password`, {
      'password':plainPassword
    }).subscribe( resp =>{
      if(resp.status != true){


      }else{

      }

    });
  }

  registerUser(params) : Observable<registerUserResponse> {
    
    return this.http.post<registerUserResponse>(`${API_CONFIG.api}/security/register`, params);
  }

}
