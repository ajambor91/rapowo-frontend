import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user/user.model';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SongData} from '../../model/song/song-data.model';
import {TextService} from '../../services/text.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {API_CONFIG} from '../../config/config.module';
import {Helpers} from '../../helpers/helpers';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  animations: [
    trigger('showAdditionalInfo',[
      transition(':enter', [
        style({height: '0px'}),
        animate('200ms ease-in', style({height: '100px'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({height: '0px'}))
      ])
    ])
  ]
})
export class UserAccountComponent implements OnInit{
  avatar: string;
  songs: Array<SongData>;
  user: User;
  userExist = true;
  seconds = 10;
  resources = API_CONFIG.api;
  personalData;
  objectKeys = Object.keys;
  additional = Object.keys;
  showInfo = false;
  calcAge(): number | null {
    const today = new Date();
    const todayTimestamp = today.getTime() / 1000;
    const userTimestamp = this.user.timestamp ? this.user.timestamp : null;
    const ageTimestamp = this.user.timestamp ? todayTimestamp - userTimestamp : null;
    const age = this.user.timestamp ? ageTimestamp * 1000  / (1000 * 60 * 60 * 24 * 365) : null;
    let countedAge;
    if (typeof age === 'number') {
       countedAge = age.toFixed(0);
    } else {
      countedAge = null;
    }
    return countedAge;
  }
  constructor(private helpers: Helpers, private textService: TextService,private activatedRoute: ActivatedRoute, private route: ActivatedRoute, private router: Router) {
    const resp = this.activatedRoute.snapshot.data['user'];
    if(resp.status){
      this.userExist = true;
      this.user = resp.data;
      console.log(resp.data.avatar)
      this.avatar = this.resources + '/' + resp.data.avatar;
      this.user.preparedBackground = this.helpers.prepareImages(resp.data.background);

      console.log(this.user.preparedBackground);
      this.personalData = {
        name: this.user.name ? this.user.name : null,
        city: this.user.city ? this.user.city : null,
        sex: this.user.sex ? this.user.sex : null,
        age: this.calcAge()
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
  ngOnInit(): void {
    const page = 1;
    this.textService.getTextByUserId(this.user.id, page).subscribe(resp=>{
      if(resp.status){
        this.songs = resp.data;
      }
    });
  }


}
