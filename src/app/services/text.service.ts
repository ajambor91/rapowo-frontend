import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../config/config.module';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http:HttpClient) { }
  getTexts(){
    return this.http.get(`${API_CONFIG.api}/texts/get`);
  }
}
