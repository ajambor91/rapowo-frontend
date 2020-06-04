import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs';
import {state} from '@angular/animations';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt: JwtHelperService = new JwtHelperService();
    const user: User = this.authService.currentUserValue;
    const desToken = jwt.decodeToken(user ? user.token : null);
    if((!user || !desToken) || (user.email !== desToken.email )){
      this.authService.logout();
      this.router.navigate(['/login'])
      return false;
    }else if(jwt.isTokenExpired(user.token)){
      this.authService.logout()
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }
}
