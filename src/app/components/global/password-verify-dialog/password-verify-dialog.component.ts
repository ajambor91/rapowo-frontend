import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-password-verify-dialog',
  templateUrl: './password-verify-dialog.component.html',
  styleUrls: ['./password-verify-dialog.component.css']
})
export class PasswordVerifyDialogComponent{
  password: string;
  constructor(private matDialogRef: MatDialogRef<PasswordVerifyDialogComponent>) { }
  verifyDeleting(){
    this.matDialogRef.close(this.password);
  }
  noDelete(){
    this.matDialogRef.close();
  }


}
