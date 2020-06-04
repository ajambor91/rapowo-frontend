import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {Observable, Subscription} from 'rxjs';
import {CheckNickResponse} from '../model/user/check-nick-response';
import {RegisterResponse} from '../model/user/register-response';
import {RegisterParams} from '../model/user/register-params';
import {CheckEmailResponse} from '../model/user/check-email-response';
import {ActivateResponse} from '../model/user/activate-response';
import {User} from '../model/user/user.model';
import {UpdateResponse} from '../model/user/update-response';
import {ResetPasswordResponse} from '../model/user/reset-password-response';
import {ResetPasswordParams} from '../model/user/reset-password-params';
import {GetUserByHashResponse} from '../model/user/get-user-by-hash-response';
import {DeleteUserResponse} from '../model/user/delete-user-response';
import {DeleteUserParams} from '../model/user/delete-user-params';
import {AgreementResponse} from '../model/user/agreement-response';
import {SettingsParams} from '../model/user/settings-params';
import {SettingsResponse} from '../model/user/settings-response';
import {LoginParams} from '../model/user/login-params';
import {LoginResponse} from '../model/user/login-response';
import {AddNick} from '../model/user/add-nick';


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
  activateAccount(hash: string): Observable<ActivateResponse> {
    return this.http.put<ActivateResponse>(`${API_CONFIG.api}/user/activate/${hash}`, null);
  }
  updateAccount(id: number, user: User): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(`${API_CONFIG.api}/user/edit-profile/${id}`, user);
  }
  resetPassword(params: ResetPasswordParams): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>( `${API_CONFIG.api}/user/reset-password-msg`, params);
  }
  getUserByHash(hash: string): Observable<GetUserByHashResponse> {
    return this.http.get<GetUserByHashResponse>(`${API_CONFIG.api}/user/get-user-by-hash/${hash}`);
  }
  resetPasswordReq(params: ResetPasswordParams, hash: string): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(`${API_CONFIG.api}/user/reset-password/${hash}`, params);
  }
  deleteUser(deleteUser: DeleteUserParams): Observable<DeleteUserResponse>{
    return this.http.post<DeleteUserResponse>(`${API_CONFIG.api}/user/delete-user/${deleteUser.id}`,{password: deleteUser.password});
  }
  getMailingSettings(id: number): Observable<AgreementResponse> {
    return this.http.get<AgreementResponse>(`${API_CONFIG.api}/user/settings/${id}`);
  }
  setMailingSettings(settings: SettingsParams, id: number): Observable<SettingsResponse> {
    return this.http.put<SettingsResponse>( `${API_CONFIG.api}/user/save-settings/${id}`, settings);
  }
  getUserById(id: number): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${API_CONFIG.api}/user/get/${id}`);
  }
  addNick(id: number, data: AddNick): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(`${API_CONFIG.api}/social/add-nick/${id}`, data);
  }

}
