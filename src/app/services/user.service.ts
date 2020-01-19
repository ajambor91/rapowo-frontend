import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {Observable, Subscription} from 'rxjs';
import {CheckNickResponse} from '../model/user/check-nick-response';
import {RegisterResponse} from '../model/user/register-response';
import {RegisterParams} from '../model/user/register-params';
import {CheckEmailResponse} from '../model/user/check-email-response';
import {ActivateResponse} from '../model/user/activate-response';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }
  checkEmail(email: string): Observable<CheckEmailResponse>{
    return this.http.post<CheckEmailResponse>(`${API_CONFIG.api}/user/check-exist/email`, {
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

  activateAccount(hash: Subscription): Observable<ActivateResponse> {
    return this.http.get<ActivateResponse>(`${API_CONFIG}/user/activate/${hash}`);
  }
}
