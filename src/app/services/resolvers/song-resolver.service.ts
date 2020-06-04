import { Injectable } from '@angular/core';
import {TextService} from '../text.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {SongData} from '../../model/song/song-data.model';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class SongResolverService implements Resolve<{status: boolean, data: SongData}>{
  constructor(private storageService: StorageService, private textService: TextService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<{status: boolean, data: SongData}> | {status: boolean, data: SongData} | null{
    const song = this.storageService.getSongData;
    if (typeof song !== 'undefined' && song !== null){
      return {status: true, data: song};
    } else{
      return this.textService.getSongBySlug(route.params['slug']).pipe(
        map(res => res),
        catchError(err  => of({data: false})));
    }
  }

}
