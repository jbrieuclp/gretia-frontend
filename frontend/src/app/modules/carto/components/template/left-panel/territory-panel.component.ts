import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import * as extent from 'ol/extent';

import { LayerService } from '../../../services/layer.service';

@Component({
  selector: 'app-carto-territory-panel',
  template: `
  	<div class="menu-item"
			matTooltip="Filter sur un territoire"
			(click)="openDialog()">
			<img src="/assets/images/carto/icones/territoires.png">
		</div>
  `,
  styleUrls: ['./left-panel.component.scss']
})
export class TerritoryPanelComponent {

  constructor(
  	public dialog: MatDialog
  ) { }

  openDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {};
  	dialogConfig.maxHeight = 485;
  	dialogConfig.width = '485px';
  	dialogConfig.position = {left: '55px', top: '70px'};

    const dialogRef = this.dialog.open(TerritoryPanelDialog, dialogConfig);
  }

}




/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-territory-panel-dialog',
  templateUrl: 'territory-panel.dialog.html',
  styleUrls: ['./dialog.scss']
})
export class TerritoryPanelDialog implements OnInit {

  scales: Array<string> = [];

  constructor (
    public dialogRef: MatDialogRef<TerritoryPanelDialog>,
    private layerS: LayerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() { 
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}