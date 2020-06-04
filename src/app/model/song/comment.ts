import {User} from '../user/user.model';
export class CommentTypes {
  static IN_REST = 0;
  static IN_VISIBLE = 1;
  static IN_EDIT = 2;
}
export interface Comment {
  id: number;
  content: string;
  createdAt?: string;
  user?: User;
  children?: Array<Comment>;
  visibility?: boolean;
  tools?: number;
}

