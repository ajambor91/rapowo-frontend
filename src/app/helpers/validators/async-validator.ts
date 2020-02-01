import {UserService} from '../../services/user.service';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {User} from '../../model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidator {

  constructor(private userService: UserService, private authService: AuthService) {}
  user: User = this.authService.currentUserValue;
  checkNick() {
     return (control: AbstractControl | null) => {
       if (this.user && control.value === this.user.nick) {
         return null;
       }
       this.userService.checkNick(control.value).subscribe(
            response => response.status !== true ?  control.setErrors({nickExists: false}) : null,
            error => error.status === 409 ? control.setErrors({nickExists: true}) : null
      );
    };
  }
  checkEmail() {
    return (control: AbstractControl | null) => {
      console.log(this.user);
      if (this.user && control.value === this.user.email) {
        return null;
      }
      this.userService.checkEmail(control.value).subscribe(
              response => response.status !== true ? control.setErrors({emailExists: false}) : null,
              error => error.status === 409 ? control.setErrors({emailExists: true}) : null
        );
    };
  }
}
