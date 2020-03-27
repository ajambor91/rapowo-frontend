import {API_CONFIG} from '../config/config.module';

export class Helpers {
  public prepareImages(path: string): object {
    if(!path){
      return {backgroundColor : 'red'};
    } else if (path){
      return {backgroundImage : `url(${API_CONFIG.api}/${path})`};
    }
  }
}
