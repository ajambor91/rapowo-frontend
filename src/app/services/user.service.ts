import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';
import {Observable} from "rxjs";
class checkEmailResponse {
  status: boolean;
  error: string
}
class checkNickResponse{
  status: boolean;
  error: string
}
class registerUserResponse {
  status:boolean;
  error: Object;
}
export class Errors {
  nick:String;
  email:String;
  plainPassword:String;
  repeatPassword:String;
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
  checkEmail(email):Observable<checkEmailResponse>{
    return this.http.post<checkEmailResponse>(`${API_CONFIG.api}/security/check-email`, {
      'email':email
    });
  }
  checkNick(nick):Observable<checkNickResponse>{
    return this.http.post<checkNickResponse>(`${API_CONFIG.api}/security/check-nick`, {
      'nick':nick
    });
  }
    registerUser(params) : Observable<registerUserResponse> {

    return this.http.post<registerUserResponse>(`${API_CONFIG.api}/security/register`, params);
  }

}
