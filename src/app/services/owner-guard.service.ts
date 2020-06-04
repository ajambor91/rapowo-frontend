import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, ObservableInput, of} from 'rxjs';
import {AuthService} from './auth-service';
import {User} from '../model/user/user.model';
import {TextService} from './text.service';
import {catchError, map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuardService implements CanActivate{
  constructor(private authService: AuthService, private textService: TextService, private router: Router) { }
  user: User = this.authService.currentUserValue;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.textService.checkIsUserIsAuthor(this.user, route.params['slug']).pipe(map(res=> res.status ? true : false), catchError(err => {
      this.router.navigate(['/']);
      return of(false);
    }));
  }
}
