import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user/user.model';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  user: User;
  userExist = true;
  seconds = 10;
  avatar = 'http://rapowo-backend.local/';
  personalData;
  objectKeys = Object.keys;
  calcAge(): number | null {
    const today = new Date();
    const todayTimestamp = today.getTime() / 1000;
    const userTimestamp = this.user.timestamp ? this.user.timestamp : null;
    const ageTimestamp = this.user.timestamp ? todayTimestamp - userTimestamp : null;
    const age = this.user.timestamp ? ageTimestamp * 1000  / (1000 * 60 * 60 * 24 * 365) : null;
    let countedAge;
    if (typeof age === 'number') {
       countedAge = age.toFixed(0);
    } else {
      countedAge = null;
    }
    return countedAge;
  }
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    let userId;
    this.route.paramMap.subscribe(resp => {
      userId = resp.get('id');
    });
    this.userService.getUserById(userId).subscribe( resp => {
      this.user = resp.data;
      this.avatar += this.user.avatar;
      this.userExist = true;
      this.personalData = {
        name: this.user.name ? this.user.name : null,
        city: this.user.city ? this.user.city : null,
        sex: this.user.sex ? this.user.sex : null,
        age: this.calcAge()
      };
    }, error => {
      this.userExist = false;
      setInterval(() => {
        this.seconds --;
        if (this.seconds === 0 ) {
          this.router.navigate(['/']);
        }
      }, 1000);
    });

  }




}
