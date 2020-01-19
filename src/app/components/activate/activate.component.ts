import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  seconds = 10;
  activate: boolean;
  timer() {
    setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        this.activate ? this.router.navigate(['/login']) : this.router.navigate(['/']);
        return;
      }
    }, 1000);
  }
  ngOnInit() {
    let hash;
    this.route.paramMap.subscribe(params => {hash = params.get('hash'); });
    this.userService.activateAccount(hash).subscribe(
      response => {
                if (response.status) {
                  this.activate = true;
              }
            },
            error => {
                if(error.status === 400){
                  this.activate = false;
                }else if (error.status === 409){
                  this.activate = true;
                }
            });
    this.timer();
  }
}
