import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ErrorModel} from '../../../model/helper/error-model';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ErrorModel) { }

  ngOnInit() {
    const closeDialog = () =>{
      this.dialogRef.close();
    };
    setTimeout(closeDialog, 2000);
  }

}
