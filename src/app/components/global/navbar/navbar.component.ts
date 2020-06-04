import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/user/user.model';
import {AuthService} from '../../../services/auth-service';
import {Helpers} from '../../../helpers/helpers';
import { Event as Ev} from '../../../model/event/event';
import {Observable} from 'rxjs';
import {EventServiceService} from '../../../services/event-service.service';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';
import {API_CONFIG} from '../../../config/config.module';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('mobileMenuEl', [
        state('visible', style({
          zIndex: 5,
          position: 'fixed',
          top: 0
        })),
        state('hidden', style({
          top: '-60px'
        })),
        state('static', style({
          top: '60px',
          zIndex: 0,
          position: 'static'
        })),
        transition('visible => hidden', [
          animate('0.5s')
        ]),
        transition('hidden => visible', [
          animate('0.5s')
        ])
    ]),
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{
  @Input() user: User;
  @Input() notify: Observable<Array<Ev>>;
  @ViewChild('mobileMenuEl', {static: true}) mobileMenuEl: ElementRef;
  mobileMenu = false;
  currentOffset: number;
  notifications: Array<Ev>;
  wsConnected = false;
  ws: WebSocketSubject<any>;
  notifyCount = 0;
  mobileNotify = false;
  mobileMenuShow = true;
  currentState = 'visible';
  String = String;
  constructor(private eventService: EventServiceService, private authService: AuthService, private helpers: Helpers) {
    this.user = this.authService.currentUserValue;
    this.ws = webSocket(API_CONFIG.wsApi);
  }
  @HostListener('window:scroll',[]) mobileMenuScroll(): void {
    const menuHeight = this.mobileMenuEl.nativeElement.scrollTop;
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if(pos > menuHeight && pos < this.currentOffset){
      this.currentState = 'visible';
    }else if(pos > menuHeight && pos > this.currentOffset){
      this.currentState = 'hidden';
    }else{
      this.currentState = 'static';
    }
    this.currentOffset = pos;

  }
  logout(){
    this.mobileMenu = false;
    this.wsConnected = null;
    this.authService.logout();
  }
  ngOnInit(){

    this.authService.currentUser.subscribe((user: User) => {
      console.log('in2')
      this.user = user;
      if(user) this.user.preparedAvatar = this.helpers.prepareAvatar(this.user.navbar ? this.user.navbar.path : null);
      if(user && !this.wsConnected){
        this.wsConnect();
        this.eventService.getEvents(this.user.id).subscribe(res => {
          if(typeof res.data === 'object'){
            this.notifications = res.data;
            this.notifyCount = Number(res.unread_events);
          }
        }); //TODO do zmiany
      }
    });
    // if(this.user){
    //   this.user.preparedAvatar = this.helpers.prepareAvatar(this.user.navbar.path);
    //   this.eventService.getEvents(this.user.id).subscribe(res => {
    //     if(typeof res.data === 'object'){
    //       this.notifications = res.data;
    //       this.notifyCount = Number(res.unread_events);
    //     }
    //   });
    // }
    if(this.user && !this.wsConnected){
      this.wsConnect();
    }
  }

  wsConnect(): void {
    const POSSIBLE_STATUSES = [
      'most-comment',
      'new-folllowed-text',
      'new-text',
      'popular-text',
      'popular-followed',
      'new-comment',
      'reply-comment'
    ];
    this.ws.asObservable().subscribe(res => {
      if(res.status){
        if(!this.wsConnected){
          this.ws.next({type: 'init', userId: this.user.id});
        }
        this.wsConnected = true;
        if(POSSIBLE_STATUSES.includes(res.status)){
          this.notifications.unshift(res);
          const notLength = this.notifications.length;
          if(notLength >= 15){
            this.notifications.splice(notLength - 1,1);
          }
          this.notifyCount++;
        }

      }

    });
  }
  ngOnDestroy(): void {
    this.ws.unsubscribe();
    this.wsConnected = null;
  }
  setIsReadAndSendToApi(): void {
    this.eventService.markAsRead(this.user.id).subscribe(resp => {
      return;
    });
  }
  setIsReadOnFront(index: number): void {
    this.notifications[index].data.is_read = true;
    if(this.notifyCount > 0){
      this.notifyCount--;
    }

  }
  @HostListener('window:beforeunload') cancelWs() {
    this.ws.next({type: 'close', data: this.user.id});
  }

}
