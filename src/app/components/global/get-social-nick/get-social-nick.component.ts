import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-get-social-nick',
  templateUrl: './get-social-nick.component.html',
  styleUrls: ['./get-social-nick.component.css']
})
export class GetSocialNickComponent{

  constructor(private matDialogRef: MatDialogRef<GetSocialNickComponent>) { }
  nick: boolean;
  verifyDeleting(){
    this.matDialogRef.close(this.nick);
  }


}
