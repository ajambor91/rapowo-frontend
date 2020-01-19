import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
export class PasswordValidator {

  matchPasswords(): ValidatorFn {
    return (control: AbstractControl): {invalid: boolean } | null => {
      let matchPass: boolean;
      if(control.get('password').value !== control.get('repeatPassword').value){
        matchPass = true;
        control.get('repeatPassword').setErrors({matchPasswords: true});
      }
      return matchPass ? {invalid: true} : null;
    };
  }
}



