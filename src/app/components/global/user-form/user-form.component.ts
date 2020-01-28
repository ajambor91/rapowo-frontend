import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DatepickerModel} from '../../../model/helper/datepicker-model';
import {Avatar} from '../../../model/helper/avatar';
import {AvatarMove} from '../../../model/helper/avatar-move';
import {AvatarSize} from '../../../model/helper/avatar-size';
import {AuthService} from '../../../services/auth-service';
import {User} from '../../../model/user/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],


})

export class UserFormComponent implements OnInit{
  @Input() submitted: boolean;
  @Input() registerForm;
  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() buttonText: string;
  @Input() timestamp: number;
  submit = false;
  today: Date;
  startDate: Date | null;
  datepicker: DatepickerModel;
  ngOnInit() {
    this.today = new Date();
    this.startDate = this.timestamp !== null && typeof this.timestamp !== 'undefined' ? new Date(this.timestamp*1000) : null;
    this.datepicker = {
      minDate: {
        year: 1950,
        month: 1,
        day: 1,
      },
      maxDate: {
        year: this.today.getFullYear() - 13,
        month: this.today.getMonth() + 1,
        day: this.today.getDate()
      },
      startDate: this.startDate === null ? null : {
        year: this.startDate.getFullYear(),
        month: this.startDate.getMonth() + 1,
        day: this.startDate.getDate()
      }
    };
  }
  get form(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  get passwords(): AbstractControl {
    return this.registerForm.get('passwords');
  }
  set avatarSize(size: AvatarSize) {
    this.registerForm.get('avatar').get('size').setValue(size);
  }
  set avatarMoved(moved: AvatarMove) {
    this.registerForm.get('avatar').get('moved').setValue(moved);
  }
  set avatarPath(path: string) {
    this.registerForm.get('avatar').get('path').setValue(path);
  }
  addAvatar(avatar: Avatar): void {
    if (!avatar.path) {
      return;
    }
    const size: AvatarSize = {
      sizeX: avatar.sizeX,
      sizeY: avatar.sizeY
    };
    const moved: AvatarMove = {
      moveX: avatar.moveX,
      moveY: avatar.moveY
    };
    const path = avatar.path;
    this.avatarSize = size;
    this.avatarMoved = moved;
    this.avatarPath = path;
  }
  sendFormFn(): void{
    this.submit = true;
    this.sendForm.emit(true);
  }


}




