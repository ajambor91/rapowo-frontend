import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TextService} from '../text.service';
import {Observable} from 'rxjs';
import {SongResponse} from '../../model/song/song-response';

@Injectable({
  providedIn: 'root'
})
export class GetQueueTextsResolver implements Resolve<any>{
  constructor(private textService: TextService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SongResponse>{
    return this.textService.getTexts(1, true);
  }
}
