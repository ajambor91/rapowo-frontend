import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {User} from '../../model/user/user.model';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loader: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((ev: RouterEvent) => {
      this.checkRouterEvent(ev);
    });
  }
  user: User = this.authService.currentUserValue;
  ngOnInit() {
  }
  checkRouterEvent(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      const pattern = /settings/;
        if(pattern.test(event.url)){
          this.loader = true;
        }else {
          this.loader = false;
        }
    } else if (
      event instanceof NavigationCancel ||
      event instanceof NavigationEnd ||
      event instanceof NavigationError
    ) {
      this.loader = false;
    }
  }

}
