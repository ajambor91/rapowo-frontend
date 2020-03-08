import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SettingsResponse} from '../../model/user/settings-response';
import {Observable} from 'rxjs';
import {UserService} from '../user.service';
import {AgreementResponse} from '../../model/user/agreement-response';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsResolverService implements Resolve<AgreementResponse>{

  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgreementResponse> | Promise<AgreementResponse> | AgreementResponse {
    return this.userService.getMailingSettings(route.params['id']);
  }
}
