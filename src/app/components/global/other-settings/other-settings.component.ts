import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PasswordVerifyDialogComponent} from '../password-verify-dialog/password-verify-dialog.component';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth-service';
import {switchMap} from 'rxjs/operators';
import { of} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {ErrorService} from '../../../services/error-service';

@Component({
  selector: 'app-other-settings',
  templateUrl: './other-settings.component.html',
  styleUrls: ['./other-settings.component.css']
})
export class OtherSettingsComponent implements OnInit {
  passVerify: MatDialogRef<PasswordVerifyDialogComponent>;
  submitted = false;
  constructor(private errorService: ErrorService, private router: Router, private authService: AuthService, private userService: UserService, private matDialog: MatDialog, private formBuilder: FormBuilder) { }
  otherSettingsForm = this.formBuilder.group({
    deleteUser: ['']
  });
  openDialog(){
    this.passVerify =  this.matDialog.open(PasswordVerifyDialogComponent, {
      panelClass: 'custom-modal'
      }
    );
  }
  submit(){
    console.log(this.otherSettingsForm);
    if(this.otherSettingsForm.invalid || this.submitted){
      return;
    }
    this.submitted = true;
    if(this.otherSettingsForm.get('deleteUser').value){
      this.openDialog();
      this.passVerify.afterClosed().pipe( switchMap( resp => {
        if(!resp){
          return of();
        }
        return this.userService.deleteUser({id: this.authService.currentUserValue.id, password: resp});
      })).subscribe( resp => {
        this.authService.logout();
        this.router.navigate(['delete-user']);
      },
        err => {
          this.matDialog.open(NotificationDialogComponent, {
            panelClass: 'custom-modal',
            width: '250px',
            data: this.errorService.errorMessageValue.value
          });
        });
      this.submitted = false;
    }
  }

  ngOnInit() {
  }

}
