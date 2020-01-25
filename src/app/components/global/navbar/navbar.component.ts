import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user/user.model';
import {AuthService} from '../../../services/auth-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() user: User;
  constructor(private authService: AuthService) { }
  logout(){

    this.authService.logout();
  }
  ngOnInit(){
    this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }
}
