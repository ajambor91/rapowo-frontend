import {RegisterParams} from './register-params';

export class RegisterParamsClass implements RegisterParams{
  nick = null;
  email = null;
  name = null;
  passwords = {
    password: null,
    repeatPassword: null
  };
  city = null;
  birthdate = null;
  sex = null;
  socialId = null;
  type = null;

}
