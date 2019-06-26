import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-carto-tooltip',
  templateUrl: './tooltip.dialog.html',
  styleUrls: ['./tooltip.dialog.scss']
})
export class TooltipDialog implements OnInit {

  constructor(
  	public dialogRef: MatDialogRef<TooltipDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
