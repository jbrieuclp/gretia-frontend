import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { LayerService } from '../../../services/layer.service';
import { Layer } from '../../../layers/layer';

@Component({
  selector: 'app-carto-legende',
  templateUrl: './legende.component.html',
  styleUrls: ['./legende.component.scss']
})
export class LegendeComponent implements OnInit {

  constructor(
  	public dialog: MatDialog,
  	public layerS: LayerService
  ) { }

  ngOnInit() {
  }

  openTuneDialog(layer) {
  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = layer;
  	dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    const dialogRef = this.dialog.open(LegendTuneDialog, dialogConfig);
  }

}


/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-fond-plan-dialog',
  templateUrl: 'legende-tune.dialog.html',
  styleUrls: ['./legende-tune.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LegendTuneDialog implements OnInit {

	layer: Layer;

  constructor (
    public dialogRef: MatDialogRef<LegendTuneDialog>,
    public layerS: LayerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  	this.layer = this.data;
  }

  changeStyle(STYLE_KEY) {
  	this.layer.displayStyle = STYLE_KEY;
  	this.layer.olLayer.setStyle(this.layer.styles[STYLE_KEY].style_function);
  }

  get legendDetail() {
    return this.layer.styles[this.layer.displayStyle].display;
  }

  isArray(e: any) {
    return Array.isArray(e);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}