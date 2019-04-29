import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{


  constructor(private http:HttpClient) { }

 email:string = null;
 plainPassword:string = null;


  loginUser(){
       this.http.post<User>(`${API_CONFIG.api}/security/login`,{'plainPassword':this.plainPassword, 'email':this.email}).subscribe(resp=>{
           console.log(resp);
         });
  }
  test(){
    alert('dsd');
  }

}
