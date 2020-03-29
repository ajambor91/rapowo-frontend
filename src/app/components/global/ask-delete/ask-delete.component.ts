import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ask-delete',
  templateUrl: './ask-delete.component.html',
  styleUrls: ['./ask-delete.component.css']
})
export class AskDeleteComponent {
  constructor(public dialogRef: MatDialogRef<AskDeleteComponent>) { }
  delete(): void {
    this.dialogRef.close({delete: true});
  }
  noDelete(): void {
    this.dialogRef.close({delete: false});
  }

}
