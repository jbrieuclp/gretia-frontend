import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import * as extent from 'ol/extent';

import { LayerService } from '../../../services/layer.service';
import { CartoService } from '../../../services/carto.service';

@Component({
  selector: 'app-carto-grids-panel',
  template: `
  	<div class="menu-item"
			matTooltip="Changer le type de restitution"
			(click)="openDialog()">
			<img src="/assets/images/carto/icones/grille.png">
		</div>
  `,
  styleUrls: ['./left-panel.component.scss']
})
export class GridsPanelComponent {

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

    const dialogRef = this.dialog.open(GridsPanelDialog, dialogConfig);
  }

}




/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-grids-panel-dialog',
  templateUrl: 'grids-panel.dialog.html',
  styleUrls: ['./dialog.scss']
})
export class GridsPanelDialog implements OnInit {

  scales: Array<string> = [];

  constructor (
    public dialogRef: MatDialogRef<GridsPanelDialog>,
    private layerS: LayerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() { 
    this.getScales();
  }

  getScales() {
    this.layerS.getAvailablesScales()
      .subscribe(scales => this.scales = scales)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}