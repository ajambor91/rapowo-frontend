import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {User} from '../../model/user/user.model';
import {LoginResponse} from '../../model/user/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService implements Resolve<LoginResponse>{
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoginResponse>{
    return this.userService.getUserById(route.params['id']);
  }
}
