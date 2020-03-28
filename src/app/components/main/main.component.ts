import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  { TextService} from '../../services/text.service';
import {UserService} from '../../services/user.service';
import {SongResponse} from '../../model/song/song-response';
import {SongData} from '../../model/song/song-data.model';
import {SongOption} from '../../model/song/song-option';
import {API_CONFIG} from '../../config/config.module';
import {User} from '../../model/user/user.model';
import {Helpers} from '../../helpers/helpers';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TextService]

})
export class MainComponent implements OnInit{
  title = 'rapowo';
  constructor(private http: HttpClient, private api: TextService, private helpers: Helpers) {}
  texts: SongResponse;
  songs: Array<SongData>;
  additionalData: SongOption;
  resources: string = API_CONFIG.api;
  ngOnInit() {
    this.getTexts();
  }

  getTexts(): void {
    this.api.getTexts().subscribe(resp =>{
      this.texts = resp;
      this.songs = resp.data;
      for(let i = 0; i <= this.songs.length - 1; i++){
        this.songs[i].user.preparedBackground = this.helpers.prepareImages(this.songs[i].user.background.path);
      }
      this.additionalData = resp.additional_data;
      console.log(typeof this.songs);
      console.log(this.texts);
    });
  }




}
