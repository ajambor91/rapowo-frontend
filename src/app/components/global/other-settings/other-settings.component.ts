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
import {User} from '../../../model/user/user.model';
import {AskDeleteComponent} from '../ask-delete/ask-delete.component';

@Component({
  selector: 'app-other-settings',
  templateUrl: './other-settings.component.html',
  styleUrls: ['./other-settings.component.css']
})
export class OtherSettingsComponent {
  passVerify: MatDialogRef<PasswordVerifyDialogComponent>;
  askPassword: MatDialogRef<AskDeleteComponent>;
  submitted = false;
  password: string;
  constructor( private errorService: ErrorService, private router: Router, private authService: AuthService, private userService: UserService, private matDialog: MatDialog, private formBuilder: FormBuilder) { }
  otherSettingsForm = this.formBuilder.group({
    deleteUser: ['']
  });
  user: User = this.authService.currentUserValue;

  openDialog() {
    this.passVerify =  this.matDialog.open(PasswordVerifyDialogComponent, {
      panelClass: 'custom-modal'
      }
    );
  }
  submit() {
    if (this.otherSettingsForm.invalid || this.submitted) {
      return;
    }
    this.submitted = true;
    if (this.otherSettingsForm.get('deleteUser').value && (this.user.sociaId === null || this.user.sociaId === '')) {
      this.openDialog();
      this.passVerify.afterClosed().pipe( switchMap( resp => {
        this.password = resp;
        if (!resp) {
          return of();
        }
        this.deleteAccount();
        return;
      })).subscribe( resp => {
        this.logout();

      },
        err => {
          this.matDialog.open(NotificationDialogComponent, {
            panelClass: 'custom-modal',
            width: '250px',
            data: this.errorService.errorMessageValue.value
          });
        });
      this.submitted = false;
    } else if (this.otherSettingsForm.get('deleteUser').value && this.user.sociaId !== ''){
      this.askPassword = this.matDialog.open(AskDeleteComponent, {
        panelClass: 'custom-modal'
      });
      this.askPassword.afterClosed().subscribe(resp => {
        if(resp.delete){
          this.password = null;
          this.deleteAccount();
        }
        this.submitted = false;
        return;
      });
    }
  }
  deleteAccount(): void {
    this.userService.deleteUser({id: this.authService.currentUserValue.id, password: this.password}).subscribe(resp => {
      this.logout();
      return;
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['delete-user']);
  }

}
