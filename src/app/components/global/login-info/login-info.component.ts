import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginInfoComponent>) { }

  ngOnInit() {
    const closeDialog = () =>{
      this.dialogRef.close();
    };
    setTimeout(closeDialog, 5000);
  }

}
