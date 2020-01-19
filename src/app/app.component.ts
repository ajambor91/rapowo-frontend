import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {User} from './model/user/user.model';
import {AuthService} from './services/auth-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rapowo';
  user: User;

  constructor(private translate: TranslateService, private authService: AuthService) {
    translate.setDefaultLang('eng');
    this.user = authService.currentUserValue;
  }
}






