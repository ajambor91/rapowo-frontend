import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '../model/user/user.model';
import {API_CONFIG} from '../config/config.module';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User>(`${API_CONFIG.api}/users`);
  }

  getById(id: number) {
    return this.http.get(`${API_CONFIG.api}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${API_CONFIG.api}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${API_CONFIG.api}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${API_CONFIG.api}/users/${id}`);
  }
}
