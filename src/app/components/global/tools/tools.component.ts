import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Helpers} from '../../../helpers/helpers';
import {TextService} from '../../../services/text.service';
import {SongData} from '../../../model/song/song-data.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ErrorService} from '../../../services/error-service';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import { mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AskDelSongComponent} from '../ask-del-song/ask-del-song.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent{
  constructor(private router: Router, private dialog: MatDialog, private errorService: ErrorService, private textService: TextService, private helpers: Helpers) {
  }
  @Input() text: SongData;
  @Input() index: number;
  @Output() emitter: EventEmitter<number> = new EventEmitter<number>()
  submit = false;
  askDel: MatDialogRef<AskDelSongComponent>;
  openDialog(): void {
    this.askDel = this.dialog.open(AskDelSongComponent, {
      panelClass: 'custom-modal'
    });
  }
  emitSongIndex(index: number): void {
    this.emitter.emit(index);
  }
  remove(id: number): void {

    if (this.submit) { return; }
    this.submit = true;
    this.openDialog();
    this.askDel.afterClosed().pipe(tap(resp => resp), mergeMap(resp => {
      if(!resp.delete) {return of();}
      const text = this.textService.removeText(id);
      this.submit = false;

      return text;
    })).subscribe(resp => {
      this.submit = false;
      if(typeof this.index === 'number' && this.index !== null){
        this.emitSongIndex(this.index);
        return;
      }
      this.router.navigate(['/']);
      return;
    }, error => {
      this.dialog.open(NotificationDialogComponent, {
        panelClass: 'custom-modal',
        width: '250px',
        data: this.errorService.errorMessageValue.value
      });
      this.submit = false;
    });

  }
}
