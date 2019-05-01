import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';
import {Observable} from "rxjs";
class CheckEmailResponse {
  status: boolean;
  error: string
}
class CheckNickResponse{
  status: boolean;
  error: string
}
class RegisterUserResponse {
  status:boolean;
  error: Object;
}
export class Errors {
  nick:string;
  email:string;
  plainPassword:string;
  repeatPassword:string;
}
export class UserParams{

  nick: string;
  email: string;
  plainPassword: string;
  repeatPassword:string;
  name: string;
  age: string;
  city: string;
  sex: string;
  image: string;
}
export class LoginResponse {
  status:boolean;
  token:string;
  user: UserParams;
}
export class LoginParams {
  email:string;
  plainPassword:string;
}
@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }
  checkEmail(email):Observable<CheckEmailResponse>{
    return this.http.post<CheckEmailResponse>(`${API_CONFIG.api}/security/check-email`, {
      'email':email
    });
  }
  checkNick(nick):Observable<CheckNickResponse>{
    return this.http.post<CheckNickResponse>(`${API_CONFIG.api}/security/check-nick`, {
      'nick':nick
    });
  }
  registerUser(params) : Observable<RegisterUserResponse> {

    return this.http.post<RegisterUserResponse>(`${API_CONFIG.api}/security/register`, params);
  }
  login(params): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_CONFIG.api}/security/login`, params);
  }

}
