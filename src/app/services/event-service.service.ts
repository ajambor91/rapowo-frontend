import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Event as Ev} from '../model/event/event';
import {API_CONFIG} from '../config/config.module';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http: HttpClient) { }
  getEvents(userId: number): Observable<{status: boolean, data?: string | Array<Ev> , 'unread_events': number}> {
    return this.http.get<{status: boolean, data?: string | Array<Ev>, 'unread_events': number}>(`${API_CONFIG.api}/events/get/${userId}`);
  }
  markAsRead(userId: number): Observable<{status: boolean, data?: string}> {
    return this.http.get<{status: boolean, data?: string}>(`${API_CONFIG.api}/events/mark-as-read/${userId}`);
  }
  getAllEvents(userId: number, page: number): Observable<{status: boolean, data: Array<Ev> | string}>{
    return this.http.get<{status: boolean, data: Array<Ev> | string}>(`${API_CONFIG.api}/events/get-all-events/${userId}/${page}`);
  }
}
