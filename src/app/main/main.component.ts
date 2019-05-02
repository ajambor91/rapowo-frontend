import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  { TextService} from '../services/text.service';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TextService]

})
export class MainComponent implements OnInit{
  title = 'rapowo';
  constructor(private http: HttpClient, private api:TextService) {}
  texts:object = null;
  ngOnInit() {
    this.getTexts();
  }

  getTexts(){
    this.api.getTexts().subscribe(resp=>{
      this.texts = resp;
    });
  }




}
