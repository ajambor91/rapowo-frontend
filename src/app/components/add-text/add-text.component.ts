import {Component, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../../config/config.module';
import {TextService} from '../../services/text.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../services/error-service';
import {MatDialog} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {SongData} from '../../model/song/song-data.model';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent implements OnDestroy{
  drafted = false;
  submit = false;
  submitted = false;
  content: string;
  changed = false;
  constructor(private errorService: ErrorService, private dialog: MatDialog, private router: Router, private textService: TextService, private formBuilder: FormBuilder) {}
  addTextForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });
  get getContent(): AbstractControl {
    return this.addTextForm.get('content');
  }
  get getTitle(): AbstractControl {
    return this.addTextForm.get('title');
  }
  setTextarea(): void {
    this.addTextForm.get('content').setValue(this.content);
  }
  checkTextArea(): void{
    if(this.content === '' || this.content === null || typeof this.content === 'undefined'){
      this.changed = true;
    } else {
      this.changed = false;
    }
  }
  addDraft(): void {
    if(this.drafted){
      return;
    }
    this.drafted = true;
    this.setTextarea();
    let song: SongData;
    song = this.addTextForm.value;
    if(typeof song.slug === 'undefined'){
      song.slug = null;
    }
    this.textService.saveDraft(song).subscribe(resp => {

    });
  }
  addText(): void{
    const value = this.checkTextArea();
    this.setTextarea();
    this.submit = true;
    if (this.submitted || !this.addTextForm.valid){
      return;
    }
    this.textService.addText(this.addTextForm.value).subscribe(resp =>{
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

  ngOnDestroy(): void {
    this.addDraft();
  }

}
