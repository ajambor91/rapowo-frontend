import {User} from './user.model';

export interface UpdateResponse {
  status: boolean;
  data?: User;
}
