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
  navbar?: Avatar;
  additional: UserAdditionalData;
  preparedBackground?: object;
  socialId?: string;
  agreements?: boolean;
  lastLoginDate?: string;
  followed?: boolean;
  preparedAvatar?: string;
  mainAvatar?: Avatar;
  mainBackground?: Background;
}
