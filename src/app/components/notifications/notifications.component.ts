import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Event as Ev} from '../../model/event/event';
import {Helpers} from '../../helpers/helpers';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifications: Array<Ev>;
  loader = false;
  String = String;
  constructor(private helpers: Helpers, private activatedRoute: ActivatedRoute) {
    this.notifications = this.activatedRoute.snapshot.data['notify']['data'];
  }
}
