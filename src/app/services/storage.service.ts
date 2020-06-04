import { Injectable } from '@angular/core';
import {SongData} from '../model/song/song-data.model';
import {User} from '../model/user/user.model';
interface StorageData {
  song?: SongData;
  user?: User;
}
@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private storageData: StorageData;
  private checkIsDefined(type: string){
    if(typeof this.storageData === 'undefined' || typeof this.storageData[type] === 'undefined' ){
      return false;
    }
    return true;
  }
  set setSongData(data: SongData){
    this.storageData = {
      song: data
    };
  }
  get getSongData(): SongData {
    if(!this.checkIsDefined('song')){
      return null;
    }
    return this.storageData.song;
  }
  set setUserData(data: User) {
    this.storageData = {
      user: data
    };
  }
  get getUserData(): User {
    if(!this.checkIsDefined('user')){
      return null;
    }
    return this.storageData.user;
  }
  set setStorageData(data: StorageData) {
    this.storageData = data;
  }
  get getStorageData(): StorageData {
    return this.storageData;
  }
}
