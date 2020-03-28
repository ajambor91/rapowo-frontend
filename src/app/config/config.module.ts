import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

export let CONFIG = new InjectionToken<Config>('app.config');

export class Config {
  api: string;
}

export const API_CONFIG: Config = {
  api: environment.api
};

@NgModule({
  providers: [{
    provide: CONFIG,
    useValue: API_CONFIG
  }]
})
export class ConfigModule { }
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google.appId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebook.appId)
  }
]);
export function socialFactory() {
  return config;
}
