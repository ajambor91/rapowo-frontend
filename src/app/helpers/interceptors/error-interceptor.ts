import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ErrorService} from '../../services/error-service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ErrorModel} from '../../model/helper/error-model';
@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorMessageService: ErrorService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        err => {
           const errorMessage: ErrorModel = {
              title: 'error',
              type: err.status,
              desc: err.statusText
            };
           this.errorMessageService.erroMessage = errorMessage;
           return throwError(err);
        }
      )
    );
  }
}
