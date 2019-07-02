import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import * as extent from 'ol/extent';

import { CartoService } from '../../../services/carto.service';
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
  	dialogConfig.maxHeight = (this.cartoS.mapview.nativeElement.offsetHeight - 11)+'px';;
  	dialogConfig.width = '485px';
  	dialogConfig.position = {left: '55px', top: '70px'};

    const dialogRef = this.dialog.open(TimePanelDialog, dialogConfig);
  }

}




/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-time-panel-dialog',
  templateUrl: 'time-panel.dialog.html',
  styleUrls: ['./dialog.scss', './time-panel.dialog.scss']
})
export class TimePanelDialog implements OnInit {

	layers = layers;
  calendars = {start: false, end: false};
  formSaison: FormGroup;
  formPeriode: FormGroup;

  constructor (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TimePanelDialog>,
    private cartoS: CartoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {
    this.setForms();
  }

  setForms() {
    this.formSaison = this.fb.group({
        'start': ['', [Validators.required, Validators.pattern('^[0-9]{2}/[0-9]{2}$')]],
        'end': ['', [Validators.required, Validators.pattern('^[0-9]{2}/[0-9]{2}$')]],
    });

    this.formPeriode = this.fb.group({
        'start': ['', [Validators.required]],
        'end': ['', [Validators.required]],
    });
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

  setPeriode() {

  }
}