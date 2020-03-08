import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {User} from '../../model/user/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: User = this.authService.currentUserValue;
  ngOnInit() {
  }

}
