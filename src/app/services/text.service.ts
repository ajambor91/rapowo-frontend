import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {Observable} from 'rxjs';
import {AddTextParams} from '../model/song/add-text-params';
import {AddTextReponse} from '../model/song/add-text-reponse';
import {SongResponse} from '../model/song/song-response';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }
  getTexts(): Observable<SongResponse>{
    return this.http.get<SongResponse>(`${API_CONFIG.api}/text/get`);
  }
  addText(params: AddTextParams): Observable<AddTextReponse> {
    return this.http.post<AddTextReponse>( `${API_CONFIG.api}/text/private/add-text`, params);
  }
  getTextByUserId(id: number, page: number): Observable<SongResponse> {
    return this.http.get<SongResponse>(`${API_CONFIG.api}/text/get-user-texts/${id}/${page}`);
  }
}
