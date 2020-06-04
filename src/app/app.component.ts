import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {User} from './model/user/user.model';
import {AuthService} from './services/auth-service';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatDialog} from '@angular/material';
import {LoginInfoComponent} from './components/global/login-info/login-info.component';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';
import {API_CONFIG} from './config/config.module';
import {Event as Ev} from './model/event/event';
import {EventServiceService} from './services/event-service.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Rappers.pl';
  wsConnected = false;
  user: User;
  loader: boolean;

  constructor(private titleService: Title, private eventService: EventServiceService, private matDialog: MatDialog,private translate: TranslateService, private authService: AuthService, private router:Router) {
    translate.setDefaultLang('pl');
    this.titleService.setTitle(this.title);
    this.user = authService.currentUserValue;
    this.checkIsLogged();
    this.router.events.subscribe((ev: RouterEvent) => {
        this.checkRouterEvent(ev);
    });
  }
  checkIsLogged(): void {
    const jwt: JwtHelperService = new JwtHelperService();
    if(this.user && jwt.isTokenExpired(this.user.token)){
      const redirect = false;
      this.authService.logout(redirect);
      this.matDialog.open(LoginInfoComponent,{
        width: '450px',
        panelClass: 'custom-modal',
      })
    }
  }
  checkRouterEvent(event: RouterEvent) {
    if (event instanceof NavigationStart) {
      const pattern = /settings/;
      if(pattern.test(event.url)) {
        this.loader = false;
      }else{
        this.loader = true;
      }
    } else if (
      event instanceof NavigationCancel ||
      event instanceof NavigationEnd ||
      event instanceof NavigationError
    ) {
      this.loader = false;
      const textPattern = /song/;

      if(!textPattern.test(event.url)){
        window.scrollTo(null,0);
      }
    }
  }


}






