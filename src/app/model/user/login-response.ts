import {User} from './user.model';

export interface LoginResponse {
  status: boolean;
  data: User;
}
