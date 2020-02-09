import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {SettingData} from '../../../model/user/setting-data';
import {User} from '../../../model/user/user.model';
import {AuthService} from '../../../services/auth-service';
import {MatDialog} from '@angular/material';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {ErrorService} from '../../../services/error-service';

@Component({
  selector: 'app-mailing-settings',
  templateUrl: './mailing-settings.component.html',
  styleUrls: ['./mailing-settings.component.css']
})
export class MailingSettingsComponent {
  constructor(private errorService: ErrorService, private matDialog: MatDialog, private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) {
    this.user = this.authService.currentUserValue;
    this.userService.getMailingSettings(this.user.id).subscribe(resp => {
     this.settingFormSetter = resp.data;
    });

  }
  set settingFormSetter(settingData: SettingData) {
    for (const i in this.settingForm.controls) {
      this.settingForm.get(i).setValue(settingData[i]);
    }
  }
  user: User;
  objectKeys = Object.keys;
  submitted = false;
  marked = false;
  settingForm = this.formBuilder.group({
    newText: [''],
    popularText: [''],
    mostCommented: [''],
    newFollowed: [''],
    popularFollowed: [''],
    newCommentForUser: ['']
  });
  markAll(): void {
    this.marked = !this.marked;
    for(let i in this.settingForm.controls){
        this.settingForm.get(i).setValue(this.marked);
    }
  }
  submit(): void {
    if (this.submitted) {
      return;
    }
    this.submitted = true;
    this.userService.setMailingSettings(this.settingForm.value, this.user.id).subscribe( resp => {
      this.matDialog.open(NotificationDialogComponent, {
        width: '250px',
        data: {
          title: 'Suckes',
          desc: 'Ustawienia zostały zapisane',
          type: null
        },
        panelClass: 'custom-modal'
      });
      this.submitted = false;
    },
      error => {
      this.matDialog.open(NotificationDialogComponent,{
        data: this.errorService.errorMessageValue.value,
        panelClass: 'custom-modal',
      });
      this.submitted = false;
      });
  }
}
