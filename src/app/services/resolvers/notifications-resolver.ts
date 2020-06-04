import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Event as Ev} from '../../model/event/event';
import {Observable} from 'rxjs';
import {EventServiceService} from '../event-service.service';
import {AuthService} from '../auth-service';
import {resolve} from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class NotificationsResolver implements Resolve<{status: boolean, data: Array<Ev> | string}> {
  constructor(private eventService: EventServiceService, private authService: AuthService) {
  }
  // tslint:disable-next-line:max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{status: boolean, data: Array<Ev> | string}> | Promise<{status: boolean, data: Array<Ev> | string}> | {status: boolean, data: Array<Ev> | string} {
    return this.eventService.getAllEvents(this.authService.currentUserValue.id, 1);
  }

}
