import { Injectable } from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  pl: {
    weekdays: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'N'],
    months: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  }
};

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  locale: string;
  constructor(private translate: TranslateService) {
    super();
    this.locale = this.translate.getDefaultLang();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.locale].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.locale].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return '';
  }
}
