import {Avatar} from '../helper/avatar';
import {Background} from '../helper/Background';
import {UserAdditionalData} from './user-additional-data';

export interface User {
  id: number;
  nick?: string;
  email?: string;
  token: string;
  name?: string;
  birthdate?: string;
  timestamp?: number;
  city?: string;
  sex?: string;
  avatar?: Avatar;
  background?: Background;
  additional: UserAdditionalData;
  preparedBackground?: object;
}
