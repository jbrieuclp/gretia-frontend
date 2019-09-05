import { Component, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TravailFormComponent } from '../travail-form/travail-form.component';
import { Travail } from '../../../repository/suiveuse.repository';

import * as moment from 'moment';

@Component({
  selector: 'app-projet-add-travail',
  templateUrl: './add-travail.component.html',
  styleUrls: ['./add-travail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class AddTravailComponent {

  date: string;
  formValid: boolean = false;
  @ViewChild(TravailFormComponent) travForm: TravailFormComponent;
  travaux: Travail[] = [];

  constructor() {}

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value).format('YYYY-MM-DD');
  }

  onFormTravailValid(valid: boolean) {
    this.formValid = valid;
  }

  submitForm() {
    console.log(this.travForm.save());
    console.log(this.travForm.getFormValue())
    this.travForm.resetForm(this.date);
  }

  addTravail(travail) {
    this.travaux.push(travail);
  }
}
