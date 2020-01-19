import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

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
