import {UserService} from '../../services/user.service';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidator {
  constructor(private userService: UserService) {
  }
  checkNick() {
     return (control: AbstractControl) => {
       this.userService.checkNick(control.value).subscribe(
            response => response.status !== true ?  control.setErrors({nickExists: false}) : null,
            error => error.status === 409 ? control.setErrors({nickExists: true}) : null
      );
    };
  }
  checkEmail() {
    return (control: AbstractControl) => {
       this.userService.checkEmail(control.value).subscribe(
              response => response.status !== true ? control.setErrors({emailExists: false}) : null,
              error => error.status === 409 ? control.setErrors({emailExists: true}) : null
        );
    };
  }
}
