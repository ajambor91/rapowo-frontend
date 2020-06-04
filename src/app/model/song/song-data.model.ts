import {User} from '../user/user.model';

export interface SongData{
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  user: User;
  clicked?: boolean;
  note?: number;
  slug: string;
}
