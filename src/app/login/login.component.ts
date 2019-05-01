import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService, UserParams, LoginParams} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  constructor(
    private api: UserService,
    private router: Router
  ) {
  }

  loginParams: LoginParams = new LoginParams();


  login(){

    this.api.login(this.loginParams).subscribe(log => {
      if (log.status) {
        localStorage.setItem('token', log.token.toString());
        console.log(log);
        console.log(localStorage.getItem('token'));

      }

    });
  }




}
