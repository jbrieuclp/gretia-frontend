import { Component, OnInit, Inject } from '@angular/core';
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
  selector: 'app-carto-fond-plan-panel',
  template: `
  	<div class="menu-item"
			matTooltip="Choisir le fond de plan"
			(click)="openDialog()">
			<img src="/assets/images/carto/icones/layers-control.png">
		</div>
  `,
  styleUrls: ['./left-panel.component.scss']
})
export class FondsPlanPanelComponent {

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

    const dialogRef = this.dialog.open(FondsPlanDialog, dialogConfig);
  }

}




/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-fond-plan-dialog',
  templateUrl: 'fonds-plan.dialog.html',
  styleUrls: ['./dialog.scss']
})
export class FondsPlanDialog implements OnInit {

	layers = layers

  constructor (
    public dialogRef: MatDialogRef<FondsPlanDialog>,
    private cartoS: CartoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {
    console.log(this.layers);
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  switchOpacity(layer):void {
  	let state = layer.get('displayOpacity') === undefined ? false : layer.get('displayOpacity');
  	layer.set('displayOpacity', !state);
  }

  displayOpacity(layer) {
  	return layer.get('displayOpacity') === undefined ? false : layer.get('displayOpacity');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}