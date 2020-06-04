import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongData} from '../../model/song/song-data.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TextService} from '../../services/text.service';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent {
  changed: boolean;
  drafts: Array<SongData>;
  content: string;
  selectedSong: SongData;
  submit = false;
  submitted = false;
  currentIndex: number;
  currentSlug: string;
  constructor(private dialog: MatDialog, private errorService: ErrorService, private router: Router, private textService: TextService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.drafts = this.activatedRoute.snapshot.data['draft']['data'];
    this.selectDraft(this.drafts[0]);
    if(this.activatedRoute.snapshot.queryParams['slug']){
      this.currentSlug = this.activatedRoute.snapshot.queryParams['slug'];
      this.selectBySlug(this.currentSlug);
    }
  }
  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });
  selectBySlug(slug: string): void {
   const draftsLength = this.drafts.length;
   let currentIndex: number;
   for(let i = 0; i< draftsLength; i++){
     if(this.drafts[i].slug === slug){
       currentIndex = i;
       break;
     }
   }
   this.selectDraft(this.drafts[currentIndex],currentIndex);
  }
  setTextArea(): void {
    this.form.get('content').setValue(this.content);
  }
  selectDraft(song: SongData, index: number = 0): void {
    this.selectedSong = song;
    this.form.get('content').setValue(song.content);
    this.form.get('title').setValue(song.title);
    this.content = song.content;
    this.currentIndex = index;
    this.router.navigate([],{
      queryParams: {
        slug: song.slug
      }
    })

  }
  saveDraft(): void {
    this.setTextArea();
    if(this.submit || !this.form.valid){
      return;
    }
    this.submit = true;
    this.submitted = true;
    this.textService.saveDraft(this.form.value, this.selectedSong.slug).subscribe(resp => {
      this.submitted = false;
      this.submit = false;
      if(this.form.get('title').value){
        this.drafts[this.currentIndex].title = this.form.get('title').value;
      }
    }, error => {
      this.dialog.open(NotificationDialogComponent, {
        data: this.errorService.errorMessageSubject.value,
        width: '250px',
        panelClass: 'custom-modal'
      });
      this.submitted = false;
    });
  }
  checkTextArea(): void{
    if(this.content === '' || this.content === null || typeof this.content === 'undefined'){
      this.changed = true;
    } else {
      this.changed = false;
    }
  }
  addText(): void{
    const value = this.checkTextArea();
    this.setTextArea();
    this.submit = true;
    if (this.submitted || !this.form.valid){
      return;
    }
    this.textService.publicDraft(this.selectedSong.slug, this.form.value).subscribe(resp =>{
      this.router.navigate(['']);
      return;
    }, error => {
      this.dialog.open(NotificationDialogComponent, {
        data: this.errorService.errorMessageSubject.value,
        width: '250px',
        panelClass: 'custom-modal'
      });
      this.submitted = false;
    });
  }
}
