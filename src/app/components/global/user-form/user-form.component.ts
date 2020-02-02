import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DatepickerModel} from '../../../model/helper/datepicker-model';
import {Avatar} from '../../../model/helper/avatar';
import {AvatarMove} from '../../../model/helper/avatar-move';
import {AvatarSize} from '../../../model/helper/avatar-size';
import {ErrorModel} from '../../../model/helper/error-model';
import {Birthdate} from '../../../model/helper/birthdate';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n} from '../../../services/datepickeri18n';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]

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
  error: ErrorModel;

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
  unCheckSex(event){
    const radioValue = event.currentTarget.value;
    if(this.getUserSex === radioValue){
      this.setUserSex = '';
    }

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
  get getUserSex(): string {
    return this.registerForm.get('sex').value;
  }
  set setUserSex(sex: string){
    this.registerForm.get('sex').setValue(sex);
  }
  set avatarPath(path: string) {
    this.registerForm.get('avatar').get('path').setValue(path);
  }
  set removedAvatar(removed: boolean){
    if(!this.registerForm.get('avatar').get('removed')) return;
    this.registerForm.get('avatar').get('removed').setValue(true);
  }
  setObjectToBirthdate(){
    const birthdate = this.registerForm.get('birthdate');
    let dateArray;
    if(typeof birthdate === 'string' && birthdate !== ''){
      dateArray = birthdate.split('.');
    } else{
      return;
    }
    for(let i = 0; i < dateArray.length; i++){
      dateArray[i] = Number(dateArray[i]);
    }
    let dateObject: Birthdate;
    const leapYear = (year: number) => {
      if(((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)){
        return true;
      } else {
        return false;
      }
    };
    const monthDays = {
      1: 31,
      2: leapYear(dateArray[2]) ? 29: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };
    if(dateArray[1] <= 12 && dateArray[1] > 0 && monthDays[dateArray[1]] <= dateArray[0] && dateArray[0] > 0){
      dateObject.day = dateArray[0];
      dateObject.month = dateArray[1];
    }
    if (dateArray[2] < dateArray[2] - 13 && dateArray[2] > dateArray[2] - 50){
      dateObject.year = dateArray[2];
    }
    this.registerForm.get('date').setValue(dateObject);
  }
  addAvatar(avatar: Avatar): void {
    console.log(avatar);
    if(avatar.removed){
      this.removedAvatar = avatar.removed;
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
    this.setObjectToBirthdate();
    this.sendForm.emit(true);
  }


}




