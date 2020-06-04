interface EventData {
  id: number;
  event_id: number;
  text: number;
  title: string;
  slug: string;
  author: number;
  author_nick: string;
  receiver: number;
  receiver_nick: string;
  email: string;
  event_type: number;
  event_name: string;
  is_read: boolean;
  path?: string;
  comment_id?: number;
  parent_comment_id?: number;
}
export interface Event {
  status: string;
  data: EventData;
}
