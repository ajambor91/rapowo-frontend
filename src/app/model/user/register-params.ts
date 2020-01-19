export interface RegisterParams {
  nick: string;
  email: string;
  name: string;
  passwords: {password: string, repeatPassword: string};
  city?: string;
  birthdate?: string;
  sex?: boolean;
}
