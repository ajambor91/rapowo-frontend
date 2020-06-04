import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ask-del-song',
  templateUrl: './ask-del-song.component.html',
  styleUrls: ['./ask-del-song.component.css']
})
export class AskDelSongComponent{

  constructor(public dialogRef: MatDialogRef<AskDelSongComponent>) { }
  delete(): void {
    this.dialogRef.close({delete: true});
  }
  noDelete(): void {
    this.dialogRef.close({delete: false});
  }

}
