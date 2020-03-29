import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user-info',
  templateUrl: './delete-user-info.component.html',
  styleUrls: ['./delete-user-info.component.css']
})
export class DeleteUserInfoComponent implements OnDestroy{
  seconds = 10;
  interval;
  constructor(private router: Router) {
    this.interval = setInterval(()=>{
      this.seconds --;
      if(this.seconds === 0){
        this.router.navigate(['']);
        return;
      }
    },1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
