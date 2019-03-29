import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export const ValidateDate = (format:string) => {
  return (control:AbstractControl) => {
    if( !moment(control.value, format, true).isValid() ){
      return { validDate: true };
    }
    return null;
  };
};

