import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user/user.model';
import {LoginParams} from '../model/user/login-params';
import {LoginResponse} from '../model/user/login-response';
import {API_CONFIG} from '../config/config.module';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RegisterParams} from '../model/user/register-params';
import {AuthService as SocialService} from 'angularx-social-login';

@Injectable({providedIn: 'root'})
export class AuthService {
  @Output() emitter = new EventEmitter<any>();
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient, private router: Router, private socialService: SocialService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')))
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public set editUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject = new BehaviorSubject<User>(user);
  }
  login(params: LoginParams) {
    return this.http.put<LoginResponse>(`${API_CONFIG.api}/user/login`, params)
      .pipe(map( (resp: LoginResponse) => {
        if (resp.status === true) {
          localStorage.setItem('user', JSON.stringify(resp.data));
          this.emitter.emit(resp.data);
          this.currentUserSubject = new BehaviorSubject<User>(resp.data);
          this.currentUser = this.currentUserSubject.asObservable();
          this.currentUserSubject.next(resp.data);
          //zabawa z logowaniem
          console.log('in')
          return resp.data;
        }
      }));
  }
  loginWithAdditionalData(userToLog: RegisterParams, id: number){
    return this.http.put<LoginResponse>(`${API_CONFIG.api}/social/additional/${id}`, userToLog)
      .pipe(map( user => {
        if(sessionStorage.getItem('tempUser')){
          sessionStorage.removeItem('tempUser');
        }
        localStorage.setItem('user', JSON.stringify(user.data));
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.emitter.emit(user.data);
        return user.data;
      }));
  }
  loginSocialUser(user: RegisterParams) {
    return  this.http.post<LoginResponse>(`${API_CONFIG.api}/social/login`, user)
      .pipe(map( user => {
        sessionStorage.setItem('tempUser', JSON.stringify(user.data));
        return user.data;
      }));
  }
  finalLoginSocialUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.emitter.emit(user);
  }
  logout(redirect: boolean = true){

    this.socialService.signOut(false);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.currentUser = null;
    if(redirect){
      this.router.navigate(['/']);
    }
    this.emitter.emit(null);
    this.getUser();

  }
  getUser(){
    return this.emitter;
  }
}
