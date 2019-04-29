import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  title = 'rapowo';
  constructor(private http: HttpClient) {}
  texts:object = null;
  ngOnInit() {
    this.http.get(`${API_CONFIG.api}/texts/get`).subscribe(resp => {
      this.texts=resp;
      console.log(this.texts);
    });
  }



}
