export interface User {
  id: number;
  nick: string;
  email: string;
  token: string;
  name?: string;
  birthdate?: string;
  timestamp?: number;
  city?: string;
  sex?: string;
  avatar?: string;
}
