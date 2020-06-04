import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class NgbDateFormatterCustom extends NgbDateParserFormatter{
  format(date: NgbDateStruct): string {
    if(!date) {
      return '';
    }
    const leadZero = value => value < 10 ? String(`0${value}`) : String(value);
    const month: string = leadZero(date.month);
    const day: string = leadZero(date.day);
    return `${day}.${month}.${date.year}`;
  }
  parse(value: string): NgbDateStruct {
    const date: Date = new Date(value);
    return {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
  }
}
