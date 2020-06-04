export interface DatepickerModel {
  maxDate: {
    year: number;
    month: number;
    day: number;
  };
  minDate: {
    year: number;
    month: number;
    day: number;
  };
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
}
