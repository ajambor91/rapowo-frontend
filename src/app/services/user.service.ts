import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {Observable} from "rxjs";
import {CheckNickResponse} from '../model/user/check-nick-response';
import {RegisterResponse} from '../model/user/register-response';
import {LoginResponse} from '../model/user/login-response';
import {RegisterParams} from '../model/user/register-params';
import {LoginParams} from '../model/user/login-params';
import {CheckEmailResponse} from '../model/user/check-email-response';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }
  checkEmail(email: string): Observable<CheckEmailResponse>{
    return this.http.post<{status: boolean}>(`${API_CONFIG.api}/user/check-exist/email`, {
      email
    });
  }
  checkNick(nick: string): Observable<CheckNickResponse>{
    return this.http.post<CheckNickResponse>(`${API_CONFIG.api}/user/check-exist/nick`, {
      nick
    });
  }
  registerUser(params: RegisterParams): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_CONFIG.api}/user/register`, params);
  }
}
