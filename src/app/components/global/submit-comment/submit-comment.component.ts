import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextService} from '../../../services/text.service';
import {NgModel} from '@angular/forms';
import {SongData} from '../../../model/song/song-data.model';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../../services/error-service';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {Comment} from '../../../model/song/comment';
import {Helpers} from '../../../helpers/helpers';

@Component({
  selector: 'app-submit-comment',
  templateUrl: './submit-comment.component.html',
  styleUrls: ['./submit-comment.component.css']
})
export class SubmitCommentComponent implements OnInit {
  @Input() song: SongData;
  @Input() comment: Comment;
  @Input() buttonText: string;
  @Output() commentEmit = new EventEmitter<Comment | string>();
  textArea: string;

  constructor(private helpers: Helpers, private textService: TextService, private matDialog: MatDialog, private errorService: ErrorService) { }
  submitted = false;
  ngOnInit() {
  }
  addComment(): void {
    if(this.helpers.redirectIfIsNotLogged() !== true){
      return;
    }
    if(this.submitted){
      return;
    }
    this.submitted = true;
    this.textService.addComment(this.song.id,{content: this.textArea}, this.comment ? this.comment.id : null).subscribe((res)=>{
      const comment: Comment | string = res.data;
      this.commentEmit.emit(comment);
      this.submitted = false
      }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        panelClass: 'custom-modal',
        data: this.errorService.errorMessageValue.value,
        width: '250px'
      });
      this.submitted = false
    });
  }

}
