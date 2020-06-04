import {API_CONFIG} from '../config/config.module';
import {FollowedHelper} from '../model/helper/followed-helper';
import {FollowersService} from '../services/followers.service';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';
import {User} from '../model/user/user.model';
import {TextService} from '../services/text.service';
import {SongData} from '../model/song/song-data.model';
import {StorageService} from '../services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class Helpers {
  private types: {like: string, dislike: string} = {like: 'like', dislike: 'dislike'};

  constructor(private storageService: StorageService, private textService: TextService, private followersService: FollowersService, private authService: AuthService, private router: Router) {

  }

  public prepareImages(path: string): object {
    if(!path){
      return {backgroundColor : '#810319'};
    } else if (path){
      return {backgroundImage : `url(${API_CONFIG.api}/${path})`};
    }
  }
  public prepareAvatar(path: string = null): string {
    if(!path){
      return  'assets/icons/default-avatar.svg';
    }else{
      return `${API_CONFIG.api}/${path}`;
    }
  }
  public follow(id: number, followed: boolean): Observable<{status: boolean, data?: string}> {
    if(!followed){
      return this.followersService.addToFollowed(id);
    }else{
      return this.followersService.removeFollower(id);
    }
  }
  public checkIsLogged(): boolean {
    if(this.authService.currentUserValue){
      return true;
    }else {
      return false;
    }
  }
  public redirectIfIsNotLogged(): boolean{
    if(!this.checkIsLogged()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  public calcAge(user: User): number | null {
    const today = new Date();
    const todayTimestamp = today.getTime() / 1000;
    const userTimestamp = user.timestamp ? user.timestamp : null;
    const ageTimestamp = user.timestamp ? todayTimestamp - userTimestamp : null;
    const age = user.timestamp ? ageTimestamp * 1000  / (1000 * 60 * 60 * 24 * 365) : null;
    let countedAge;
    if (typeof age === 'number') {
      countedAge = age.toFixed(0);
    } else {
      countedAge = null;
    }
    return countedAge;
  }
  public like(song: SongData, type: string): SongData {
    if(this.redirectIfIsNotLogged()){
      this.textService.noteText(song.id, type).subscribe( resp => {
        if(type === this.types.like){
          song.note++;
        }else if(type === this.types.dislike){
          song.note--;
        }
        return song;
      });
      return;
    }
  }
  public showSong(song: SongData): void {
    this.storageService.setSongData = song;
    return;
  }
  public showUser(user: User): void {
    this.storageService.setUserData = user;
    return;
  }
}
