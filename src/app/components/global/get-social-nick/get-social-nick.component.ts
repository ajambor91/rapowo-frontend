import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-get-social-nick',
  templateUrl: './get-social-nick.component.html',
  styleUrls: ['./get-social-nick.component.css']
})
export class GetSocialNickComponent{

  constructor(private matDialogRef: MatDialogRef<GetSocialNickComponent>, private userService: UserService) { }
  nick: string;
  verifyNick: boolean;
  checkIsNickExists(): void {
    this.userService.checkNick(this.nick).subscribe( resp => {
      if(resp.status){
        this.verifyNick = false;
      }
    }, error => {
      if(this.nick !== null || typeof this.nick !== null){
        this.verifyNick = true;
      }
    });
  }
  closeDialog(): void {
    this.matDialogRef.close(this.nick);
  }


}
