import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TextService} from '../text.service';
import {SongResponse} from '../../model/song/song-response';

@Injectable({
  providedIn: 'root'
})
export class GetTextResolver implements Resolve<SongResponse>{
  constructor(private textService: TextService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SongResponse>{
    return this.textService.getTexts(1, false);
  }
}
