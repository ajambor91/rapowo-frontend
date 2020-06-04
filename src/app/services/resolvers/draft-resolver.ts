import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TextService} from '../text.service';
import {SongResponse} from '../../model/song/song-response';
import {SongData} from '../../model/song/song-data.model';
import {AuthService} from '../auth-service';

@Injectable({
  providedIn: 'root'
})
export class DraftResolver implements Resolve<{status: boolean, data?: string | Array<SongData>}>{
  constructor(private textService: TextService, private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{status: boolean, data?: string | Array<SongData>}>{
    return this.textService.getDrafts(this.authService.currentUserValue.id);
  }
}
