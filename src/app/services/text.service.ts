import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';
import {Observable} from 'rxjs';
import {AddTextParams} from '../model/song/add-text-params';
import {AddTextReponse} from '../model/song/add-text-reponse';
import {SongResponse} from '../model/song/song-response';
import {SongData} from '../model/song/song-data.model';
import {Comment} from '../model/song/comment';
import {User} from '../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }
  getTexts(page: number, queue: boolean): Observable<SongResponse>{
    if(queue){
      return this.http.get<SongResponse>(`${API_CONFIG.api}/text/get/${page}/queue`);
    }else{
      return this.http.get<SongResponse>(`${API_CONFIG.api}/text/get/${page}`);

    }
  }
  addText(params: AddTextParams): Observable<AddTextReponse> {
    return this.http.post<AddTextReponse>( `${API_CONFIG.api}/text/private/add-text`, params);
  }
  getTextByUserId(id: number, page: number): Observable<SongResponse> {
    return this.http.get<SongResponse>(`${API_CONFIG.api}/text/get-user-texts/${id}/${page}`);
  }
  noteText(songId: number, type: string): Observable<{status: boolean, data?: string}> {
    return this.http.put<{status: boolean, data?: string}>(`${API_CONFIG.api}/text/private/like-text/${songId}/${type}`, null);
  }
  getSongBySlug(slug: string): Observable<{status: boolean, data: SongData}> {
    return this.http.get<{status: boolean, data: SongData}>(`${API_CONFIG.api}/text/song/${slug}`);
  }
  saveDraft(song: SongData, slug: string = null): Observable<{status: boolean, data?: string}> {
    let path = `${API_CONFIG.api}/text/private/get-draft`;
    path += slug ? `/${slug}` : '';
    return this.http.post<{status: boolean, data?: string}>(path, song);
  }
  addComment(id: number, comment: {content: string}, parentId: number = null): Observable<{status: boolean, data?: string} | {status: boolean, data?: Comment}> {
    let path = `${API_CONFIG.api}/comments/private/add/${id}`;
    path += parentId ? `/${parentId}` : '';
    return this.http.post<{status: boolean, data?: string} | {status: boolean, data?: Comment}>(path, comment);
  }
  getComments(id: number): Observable<{status: boolean, data: Array<Comment>}> {
    return this.http.get<{status: boolean, data: Array<Comment>}>(`${API_CONFIG.api}/comments/get-comments/${id}`);
  }
  editText(id: number, song: {title: string, content: string}): Observable<{status: boolean, data?:string}> {
    return this.http.put<{status: boolean, data?: string}>(`${API_CONFIG.api}/text/private/edit/${id}`, song);
  }
  removeText(id: number): Observable<{status: boolean, data?: string}> {
    return this.http.delete<{status: boolean, data?: string}>(`${API_CONFIG.api}/text/private/remove/${id}`);
  }
  checkIsUserIsAuthor(user: User, slug: string): Observable<{status: boolean}> {
    return this.http.post<{status: boolean}>(`${API_CONFIG.api}/text/private/check-author/${slug}`, user);
  }
  editComment(commentId: number, content: {content: string}): Observable<{status: boolean, data?: string}> {
    return this.http.put<{status: boolean, data?: string}>(`${API_CONFIG.api}/comments/private/edit/${commentId}`, content);
  }
  delComment(id: number): Observable<{status: boolean, data?: string}> {
    return this.http.delete<{status: boolean, data?: string}>(`${API_CONFIG.api}/comments/private/delete/${id}`);
  }
  getDrafts(userId: number): Observable<{status: boolean, data?: string | Array<SongData>}> {
    return this.http.get<{status: boolean, data?: string | Array<SongData>}>(`${API_CONFIG.api}/text/private/get-drafts/${userId}`);
  }
  getOneDraft(slug: string): Observable<{status: boolean, data?: string | SongData}> {
    return this.http.get<{status: boolean, data?: string | SongData}>(`${API_CONFIG.api}/text/private/get-one-draft/${slug}`);
  }
  publicDraft(slug: string, data: AddTextParams): Observable<{status: boolean, data?: string}> {
    return this.http.put<{status: boolean, data?: string}>(`${API_CONFIG.api}/text/private/public-draft/${slug}`,data);
  }

}
