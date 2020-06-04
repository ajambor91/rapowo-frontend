import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SongData} from '../../../model/song/song-data.model';
import {Comment, CommentTypes} from '../../../model/song/comment';
import {TextService} from '../../../services/text.service';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../../../services/error-service';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {Helpers} from '../../../helpers/helpers';
import {User} from '../../../model/user/user.model';
import {AuthService} from '../../../services/auth-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() song: SongData;
  comments: Array<Comment> = [];
  commentTypes = CommentTypes;
  tempComment: string;
  fragment: string;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private helpers: Helpers, private errorService: ErrorService, private matDialog: MatDialog, private textService: TextService) {
    this.fragment = this.activatedRoute.snapshot.fragment;
  }

  user: User = this.authService.currentUserValue;
  showRepliedComment(commentId: number): void {
    const commLength = this.comments.length;
    let index;
    for(let i = 0; i<commLength;i++){
      if(this.comments[i].id == commentId){
        index = i;
        break;
      }
    }
    this.comments[index].visibility = true;
    const commentIdHash = String(commentId);

  }
  scrollIntoComment(): void {
      setTimeout(()=>{document.getElementById(this.fragment).scrollIntoView()},300);
  }
  saveEdit(index: number, childIndex = null, comment: Comment): void {
    if (!this.tempComment) {
      this.cancelEdit(index, childIndex);
      return;
    }
    this.textService.editComment(comment.id, {content: this.tempComment}).subscribe( res => {
      this.setNewCommentValue(index, childIndex);
    }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        panelClass: 'cutom-modal',
        width: '250px',
        data: this.errorService.errorMessageValue.value
      });
    });

  }
  delComment(comment: Comment, index: number, childIndex: number = null): void {
    this.textService.delComment(comment.id).subscribe( res => {
      if (childIndex) {
        this.comments[index].children.splice(childIndex, 1);
      } else {
        this.comments.splice(index, 1);
      }
    }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        panelClass: 'custom-modal',
        width: '250px',
        data: this.errorService.errorMessageValue.value
      });
    });
  }
  setNewCommentValue(index: number, childIndex: number): void {
    if (childIndex) {
      this.comments[index].children[childIndex].content = this.tempComment;
      this.cancelEdit(index, childIndex);
    } else {
      this.comments[index].content = this.tempComment;
      this.cancelEdit(index);
    }
  }
  cancelEdit(index: number, childIndex: number = null): void {
    if (childIndex) {
      this.comments[index].children[childIndex].tools = this.commentTypes.IN_REST;
    } else {
      this.comments[index].tools = this.commentTypes.IN_REST;
    }
  }

  toggleAnswers(comment: Comment): Comment {
    comment.visibility = !comment.visibility;
    return comment;
  }
  getComments(): void {
    this.textService.getComments(this.song.id).subscribe(resp => {
        const comments: Array<Comment> = resp.data;
        const commentsLength = comments.length;
        for (let i = 0; i < commentsLength; i++) {
          const avatar = comments[i].user.avatar && comments[i].user.avatar.path ? comments[i].user.avatar.path : null;
          comments[i].user.preparedAvatar = this.helpers.prepareAvatar(avatar);
          const children = comments[i].children;
          const childrenLength = children ? children.length : null;
          if (childrenLength >= 0) {
            for (let j = 0; j < childrenLength; j++) {
              const childAvatar = children[j].user.avatar && children[j].user.avatar.path ? children[j].user.avatar.path : null;
              comments[i].children[j].user.preparedAvatar = this.helpers.prepareAvatar(childAvatar);
            }
          }
        }
        this.comments = comments;
        const commentId = this.activatedRoute.snapshot.queryParams.comment;
        this.showRepliedComment(commentId);
        this.scrollIntoComment();
        }, error => {
      this.matDialog.open(NotificationDialogComponent, {
        panelClass: 'custom-modal',
        width: '250px',
        data: this.errorService.errorMessageValue.value
      });
    });
  }
  ngOnInit() {
    this.getComments();
  }
  pushComment(comment: Comment, index: number = null): void {
    const avatar = comment.user.avatar ? comment.user.avatar.path : null;
    const bck = comment.user.background ? comment.user.background.path : null;
    comment.user.preparedAvatar = this.helpers.prepareAvatar(avatar);
    comment.user.preparedBackground = this.helpers.prepareImages(bck);
    if (typeof index !== null && index !== null) {
      if (typeof this.comments[index].children !== 'undefined' && this.comments[index].children !== null) {
        this.comments[index].children.push(comment);
      } else {
        this.comments[index].children = [comment];
      }
    } else {
      this.comments.push(comment);
    }
  }

}
