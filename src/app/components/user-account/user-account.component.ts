import {Component, DoCheck, HostListener, OnInit} from '@angular/core';
import {User} from '../../model/user/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SongData} from '../../model/song/song-data.model';
import {TextService} from '../../services/text.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Helpers} from '../../helpers/helpers';
import {AuthService} from '../../services/auth-service';
import {SongOption} from '../../model/song/song-option';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  animations: [
    trigger('showAdditionalInfo',[
      transition(':enter', [
        style({height: '0px'}),
        animate('200ms ease-in', style({height: '168px'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({height: '0px'}))
      ])
    ])
  ]
})
export class UserAccountComponent implements OnInit{
  types: {like: string, dislike: string} = {like: 'like', dislike: 'dislike'};
  avatar: string;
  songs: Array<SongData>;
  user: User;
  additionalData: SongOption;
  userExist = true;
  seconds = 10;
  personalData;
  objectKeys = Object.keys;
  additional = Object.keys;
  showInfo = false;
  loader = true;
  isLogged: boolean;
  observeClick: boolean;
  currentUserId: number;
  isBottom = false;
  addLoader = false;
  constructor(private authService: AuthService, private helpers: Helpers, private textService: TextService,private activatedRoute: ActivatedRoute, private route: ActivatedRoute, private router: Router) {
    this.isLogged = !!this.authService.currentUserValue;
    this.currentUserId = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;
    const resp = this.activatedRoute.snapshot.data['user'];

    if(resp && resp.status){
      this.userExist = true;
      this.user = resp.data;
      this.avatar = this.helpers.prepareAvatar(resp.data.avatar ? resp.data.avatar.path : null);
      this.user.preparedBackground = this.helpers.prepareImages(resp.data.background ? resp.data.background.path : null );
      this.personalData = {
        name: this.user.name ? this.user.name : null,
        city: this.user.city ? this.user.city : null,
        sex: this.user.sex ? this.user.sex : null,
        age: this.helpers.calcAge(this.user),
      };
    }
    else {
      this.userExist = false;
      setInterval(() => {
        this.seconds --;
        if (this.seconds === 0 ) {
          this.router.navigate(['/']);
          return;
        }
      }, 1000);
    }
  }
  @HostListener('window:scroll' , []) onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if(pos > max - 200 && !this.isBottom)   {
      this.isBottom = true;
      this.addLoader = true;
      let page: number;
      if(typeof this.additionalData === 'undefined'){
        page = 2;
      }else{
        page = this.additionalData.current_page + 1;
      }
      this.textService.getTextByUserId(this.user.id, page).subscribe(res => {
        const actualSongs = this.songs;
        this.songs = actualSongs.concat(res.data);
        this.additionalData = res.additional_data;
        this.isBottom = false;
        this.addLoader = false;
      });
    }
  }
  ngOnInit(): void {
    const page = 1;
    this.textService.getTextByUserId(this.user.id, page).subscribe(resp=>{
      if(resp){
        this.songs = resp.data;
        this.additionalData = resp.additional_data;
        this.loader = false;
      }
    });
  }
  follow(id: number, followed: boolean): void | null {
    if(!this.helpers.redirectIfIsNotLogged()){
      return null;
    }
    this.observeClick = true;
    this.helpers.follow(id, followed).subscribe( resp => {
      this.observeClick = false;
      this.user.followed = !followed;
    });

  }
  removeSong(index: number): void {
    this.songs.splice(index, 1);
  }

}
