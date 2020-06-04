import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongData} from '../../model/song/song-data.model';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user/user.model';
import {Helpers} from '../../helpers/helpers';
import {objectKeys} from 'codelyzer/util/objectKeys';
import {AuthService} from '../../services/auth-service';
import {TextService} from '../../services/text.service';
import {SongResponse} from '../../model/song/song-response';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../services/storage.service';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../services/error-service';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit, OnDestroy {
  types: {like: string, dislike: string} = {like: 'like', dislike: 'dislike'};
  observeClick: boolean;
  song: SongData;
  objectKeys = Object.keys;
  songs: SongResponse;
  preparedImages: {avatar: string, background: object};
  personalData: {name: string, city: string, sex: string, age: number};
  songExists = true;
  seconds = 100;
  interval;
  edit = false;
  form: FormGroup;
  editSong: {
    title: string,
    content: string
  };
  submit = false;
  submitted = false;
  currentUserId: number = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;
  constructor(private errorService: ErrorService, private matDialog: MatDialog, private storage: StorageService, private fb: FormBuilder, private router: Router, private textService: TextService, private authService: AuthService,private helpers: Helpers, private activeRouter: ActivatedRoute) {
    this.song = this.activeRouter.snapshot.data['song'] ? this.activeRouter.snapshot.data['song']['data'] : null;
    if(!this.song){
      this.songExists = false;
      this.setInterval();
      return;
    }
    this.edit = this.activeRouter.snapshot.params.edit === 'edit';
    this.prepareImages();
    this.preparePersonalData();
    if(this.edit){
      this.editFormBuilder();
      this.editSong = {
        title: this.song.title,
        content: this.song.content
      };
    }
  }
  editFormBuilder(): void {
    this.form = this.fb.group({
      title: [this.song.title, [Validators.required]],
      content: [this.song.content, [Validators.required]]
    });
  }
  setInterval(): void {
    this.interval = setInterval(()=>{
      this.seconds --
      if(this.seconds === 0){
        this.router.navigate(['/']);
        return;
      }
    },1000);
  }
  prepareImages(): void {
    const avatar = this.song.user.avatar;
    const bck = this.song.user.background;
    this.preparedImages = {
      avatar: this.helpers.prepareAvatar(avatar ? avatar.path : null),
      background: this.helpers.prepareImages(bck ? bck.path : null)
    };
  }
  preparePersonalData(): void {
    this.personalData = {
      name: this.song.user.name ? this.song.user.name : null,
      city: this.song.user.city ? this.song.user.city : null,
      sex: this.song.user.sex ? this.song.user.sex : null,
      age: this.helpers.calcAge(this.song.user),
    };
  }
  ngOnInit(): void {
  }
  follow(id: number, followed: boolean): void | null {
    if(!this.helpers.redirectIfIsNotLogged()){
      return null;
    }
    this.observeClick = true;
    this.helpers.follow(id, followed).subscribe( resp => {
      this.observeClick = false;
      this.song.user.followed = !followed;
    });

  }
  saveEditedSong(): void {
    this.submitted = true;
    this.form.get('title').setValue(this.editSong.title);
    this.form.get('content').setValue(this.editSong.content);
    if(this.submit || this.form.errors){
      return;
    }
    this.submit = true;
    this.textService.editText(this.song.id, this.form.value).subscribe(resp => {
      this.song.title = this.editSong.title;
      this.song.content = this.editSong.content;
      this.storage.setSongData = this.song;
      this.submit = false;
      this.submitted = false;

      this.router.navigate(['/song', this.song.slug]);
    }, err => {
      this.matDialog.open(NotificationDialogComponent, {
        data: this.errorService.errorMessageSubject.value,
        width: '250px',
        panelClass: 'custom-modal'
      });
      this.submit = false;
      this.submitted = false;
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
