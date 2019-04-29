import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';

@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css']
})
export class AddTextComponent {

  constructor(private http:HttpClient) { }
  title:string = '';
  content:string = '';

  addText(){
    this.http.post(`${API_CONFIG.api}/api/texts/add-text`, {"title":this.title, "content":this.content}).subscribe( resp=>{
      console.log(resp);
    });
  }

}
