import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CONFIG} from '../config/config.module';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor(private http: HttpClient) {}
  getAvatar(path: string): Observable<Blob> {
    return this.http.get(`${API_CONFIG.api}/${path}`, {
      responseType: 'blob',
      headers: {
        'Accept':'image/jpeg',
        'ServerResource': 'Images'
      },
      withCredentials: true
    });
  }
}
