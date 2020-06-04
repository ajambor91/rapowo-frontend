import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  { TextService} from '../../services/text.service';
import {UserService} from '../../services/user.service';
import {SongResponse} from '../../model/song/song-response';
import {SongData} from '../../model/song/song-data.model';
import {SongOption} from '../../model/song/song-option';
import {API_CONFIG} from '../../config/config.module';
import {User} from '../../model/user/user.model';
import {Helpers} from '../../helpers/helpers';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {Avatar} from '../../model/helper/avatar';
import {AuthService} from '../../services/auth-service';
import {NoteTypes} from '../../model/helper/note-types';
import {StorageService} from '../../services/storage.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TextService]

})
export class MainComponent implements OnInit{
  isBottom = false
  addLoader = false;
  types: NoteTypes = {
    like: 'like',
    dislike: 'dislike'
  };
  title = 'Rappers.pl - Główna';
  loader = false;
  texts: SongResponse;
  songs: Array<SongData>;
  additionalData: SongOption;
  currentUserId: number = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;
  constructor(private storageService: StorageService, private authService: AuthService, private http: HttpClient, private api: TextService, private helpers: Helpers, private router: Router, private activatedRoute: ActivatedRoute) {
    this.songs = this.activatedRoute.snapshot.data['settings']['data'];
    this.additionalData = this.activatedRoute.snapshot.data['settings']['additional_data']
    if(this.songs.length > 0){
      this.prepareData();
    }
  }
  @HostListener('window:scroll' , []) onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if(pos > max - 200 && !this.isBottom)   {
      const url = this.router.url;
      this.isBottom = true;
      this.addLoader = true;
      this.api.getTexts(this.additionalData.current_page + 1, url === '/queue').subscribe(res => {
        const actualSongs = this.songs
        this.songs = actualSongs.concat(res.data);
        this.additionalData = res.additional_data;
        this.isBottom = false;
        this.addLoader = false;
        this.prepareData();
      });
    }
  }
  ngOnInit(){
    this.authService.getUser().subscribe((user: User) => {
      this.currentUserId = user ? user.id : null;
    });
  }

  follow(id: number, follow: boolean, index: number): void | null{
    if(!this.helpers.redirectIfIsNotLogged()){
      return null;
    }
    this.songs[index].clicked = true;
    this.helpers.follow(id, follow).subscribe( resp => {
      for(let i = 0; i <=this.songs.length - 1; i++){
        if(this.songs[i].user.id === id){
          this.songs[i].user.followed = !follow;
        }
      }
      this.songs[index].clicked = false;
    });
  }
  prepareData(): void {
    for(let i = 0; i <= this.songs.length - 1; i++){
      const bck = this.songs[i].user.background && this.songs[i].user.background.path ? this.songs[i].user.background.path : null;
      this.songs[i].user.preparedBackground = this.helpers.prepareImages(bck);
      if(this.songs[i].user.avatar){
        this.songs[i].user.preparedAvatar =  this.helpers.prepareAvatar(this.songs[i].user.avatar.path );
      } else{
        const avatar: Avatar = {
          path: null,
          preparedPath: this.helpers.prepareAvatar(null)
        };
        this.songs[i].user.preparedAvatar = avatar.preparedPath;
        this.songs[i].clicked = false;
      }
    }
  }
  removeSong(index: number): void {
    this.songs.splice(index, 1);
  }







}
