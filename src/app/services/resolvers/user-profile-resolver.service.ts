import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../user.service';
import {User} from '../../model/user/user.model';
import {LoginResponse} from '../../model/user/login-response';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService implements Resolve<LoginResponse>{
  constructor(private storageService: StorageService, private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoginResponse> | LoginResponse{
    const user: User = this.storageService.getUserData;
    if(typeof user !== 'undefined' && user){
      return {status: true, data: user};
    }else{
      return this.userService.getUserById(route.params['id']).pipe(
        map(res => res),
        catchError(err => of(null))
      );
    }

  }
}
