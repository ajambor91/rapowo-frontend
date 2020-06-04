import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CONFIG} from '../config/config.module';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  constructor(private http: HttpClient) { }
  addToFollowed(id: number): Observable<{status: boolean, data?: string}> {
    return this.http.get<{status: boolean, data?: string}>(`${API_CONFIG.api}/follower/add/${id}`);
  }
  removeFollower(id: number): Observable<{status: boolean, data?: string}>{
    return this.http.delete<{status: boolean, data?: string}>(`${API_CONFIG.api}/follower/remove/${id}`);
  }
}
