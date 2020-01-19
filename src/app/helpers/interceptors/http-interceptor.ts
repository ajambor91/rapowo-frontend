import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth-service';
import {Injectable} from '@angular/core';
@Injectable()
export class HttpInterceptorim implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.currentUserValue;
    if(user && user.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    return next.handle(req);
  }
}
