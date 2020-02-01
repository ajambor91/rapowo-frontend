import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorModel} from '../model/helper/error-model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessageSubject: BehaviorSubject<ErrorModel>;
  constructor() {
    const errorDefault: ErrorModel = {
      title: null,
      type: null,
      desc: null
    };
    this.erroMessage = errorDefault;
  }
  public set erroMessage(errorMessage: ErrorModel) {
    this.errorMessageSubject = new BehaviorSubject<ErrorModel>(errorMessage);
  }
  public get errorMessageValue(): BehaviorSubject<ErrorModel> {
    return this.errorMessageSubject;
  }
}
