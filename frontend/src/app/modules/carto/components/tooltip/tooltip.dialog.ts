import { Component, Input, Inject, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

import { LayerService } from '../../services/layer.service';
import { LayerInfoDirective } from '../../layers/template/layer-info.directive';

@Component({
  selector: 'app-carto-tooltip',
  templateUrl: './tooltip.dialog.html',
  styleUrls: ['./tooltip.dialog.scss']
})
export class TooltipDialog {
  
  constructor(
  	public dialogRef: MatDialogRef<TooltipDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}