import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import * as extent from 'ol/extent';
import * as _ from 'lodash';

import { CartoService } from '../../../services/carto.service';
import { LayerService, PERIODE, SAISON } from '../../../services/layer.service';
import { layers } from '../../../services/layers.config';


@Component({
  selector: 'app-carto-time-panel',
  template: `
  	<div class="menu-item"
			matTooltip="Appliquer un filtre temporel"
			(click)="openDialog()">
			<img src="/assets/images/carto/icones/time.png">
		</div>
  `,
  styleUrls: ['./left-panel.component.scss']
})
export class TimePanelComponent {

  constructor(
  	public dialog: MatDialog,
    private cartoS: CartoService
  ) { }

  openDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {};
  	dialogConfig.maxHeight = (this.cartoS.mapview.nativeElement.offsetHeight - 11)+'px';
  	dialogConfig.width = '485px';
  	dialogConfig.position = {left: '55px', top: '70px'};

    const dialogRef = this.dialog.open(TimePanelDialog, dialogConfig);
  }

}



moment.fn.toJSON = function() { return this.format('YYYY-MM-DD'); }

/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-time-panel-dialog',
  templateUrl: 'time-panel.dialog.html',
  styleUrls: ['./dialog.scss', './time-panel.dialog.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class TimePanelDialog implements OnInit {

	layers = layers;
  calendars = {start: false, end: false};
  formSaison: FormGroup;
  formPeriode: FormGroup;
  checkboxSaisons: Array<any> = [];
  checkboxPeriodes: Array<any> = [];
  minPeriode = null;
  maxPeriode = null;

  constructor (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TimePanelDialog>,
    private cartoS: CartoService,
    public layerS: LayerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {
    this.setCheckbox();
    this.setForms();
  }

  setForms() {
    this.formSaison = this.fb.group({
        'start': [null, [Validators.required, Validators.pattern('^[0-9]{2}/[0-9]{2}$')]],
        'end': [null, [Validators.required, Validators.pattern('^[0-9]{2}/[0-9]{2}$')]],
    });

    this.formPeriode = this.fb.group({
        'start': [null, []],
        'end': [null, []],
    }, {
      validator: periodeValidator("start", "end")
    });
  }

  setCheckbox() {
    this.checkboxPeriodes = Array(
      {label: 'Données récentes (> 2000)', periode: {start: '2000-01-01', end: null}},
      {label: 'Données anciennes ( 1950-2000 )', periode: {start: '1950-01-01', end: '1999-12-31'}},
      {label: 'Données historiques (< 1950)', periode: {start: null, end: '1949-12-31'}}
    );
  
    this.checkboxSaisons = Array(
      {label: 'Printemps (21/03 - 21/06)', saison: {start: '21/03', end: '21/06'}},
      {label: 'Été (21/06 - 21/09)', saison: {start: '21/06', end: '21/09'}},
      {label: 'Automne (21/09 - 21/12)', saison: {start: '21/09', end: '21/12'}},
      {label: 'Hiver (21/12 - 21/03)', saison: {start: '21/12', end: '21/03'}}
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDaysByMonth(month){
    let i: number = 1;
    let days = [];
    while (i <= new Date(2000, month, 0).getDate()) {
        days.push(i);
        i++;
    }
    return days;
  }

  switchCalendar(calendar = null) {
    for (let key of Object.keys(this.calendars)) {
      if (key !== calendar) {
        this.calendars[key] = false;
      } else {
        this.calendars[key] = !this.calendars[key];
      }
    }
  }

  setDate(calendar, day, month) {
   
    this.formSaison.get(calendar).setValue(this.dateDayMonthToString(day, month)); 
    this.switchCalendar();
  }

  dateStringToNumber(string) {
    return string.replace(/([0-9]{2})\/([0-9]{2})/, '$2$1');
  }

  dateDayMonthToString(day, month) {
    return day.toString().padStart(2, '0')+'/'+month.toString().padStart(2, '0');
  }

  startInfEnd(start, end) {
    start = start === '' ? '0101' : start;
    end = end === '' ? '1231' : end;
    return +start <= +end;
  }

  submitPeriode() {
    if (this.formPeriode.valid) {
      let periode = {
        start: this.formPeriode.value.start.format('YYYY-MM-DD'), 
        end: this.formPeriode.value.end.format('YYYY-MM-DD')};
      this.addPeriode(periode);
    }
  }

  switchPeriode(event, periode) {
    event.checked ? this.addPeriode(periode) : this.removePeriode(periode);
  }

  addPeriode(periode: PERIODE) {
    this.layerS.addPeriode(periode);
  }

  removePeriode(periode: PERIODE) {
    this.layerS.removePeriode(periode);
  }

  periodeExists(periode): boolean {
    let result = false;
    for (let p of this.layerS.periodes) {
      if (_.isEqual(p, periode)) {
        result = true;
      }
    }
    return result;
  }

  submitSaison() {
    if (this.formSaison.valid) {
      this.addSaison(this.formSaison.value);
    }
  }

  switchSaison(event, saison) {
    event.checked ? this.addSaison(saison) : this.removeSaison(saison);
  }

  addSaison(saison: SAISON) {
    this.layerS.addSaison(saison);
  }

  removeSaison(saison: PERIODE) {
    this.layerS.removeSaison(saison);
  }

  saisonExists(saison): boolean {
    let result = false;
    for (let s of this.layerS.saisons) {
      if (_.isEqual(s, saison)) {
        result = true;
      }
    }
    return result;
  }
}

export const periodeValidator = (start, end): ValidatorFn => (control: AbstractControl) => {
  console.log(control.get(start).value === null);
  console.log(control.get(start).value === undefined);
  console.log(control.get(start).value === '');
  console.log(control.get(end).value);
  if(control.get(start).value !== null || control.get(end).value !== null) {
      return null;
  }
  return { myValidator: { valid: false } };
}