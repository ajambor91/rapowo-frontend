import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user-info',
  templateUrl: './delete-user-info.component.html',
  styleUrls: ['./delete-user-info.component.css']
})
export class DeleteUserInfoComponent{
  seconds = 10;
  constructor(private router: Router) {
    setInterval(()=>{
      this.seconds --;
      if(this.seconds === 0){
        this.router.navigate(['']);
        return;
      }
    },1000);
  }
}
