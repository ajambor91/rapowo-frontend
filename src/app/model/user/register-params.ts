export interface RegisterParams {
  id?: number;
  nick: string;
  email: string;
  name: string;
  passwords?: {password: string, repeatPassword: string};
  city?: string;
  birthdate?: string;
  sex?: boolean;
  socialId?: string;
  type?: string;
  agreements?: boolean;
}
