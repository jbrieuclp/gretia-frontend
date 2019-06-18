import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

import { CartoService } from '../../../services/carto.service';

@Component({
  selector: 'app-carto-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent {

  constructor(
  	public dialog: MatDialog,
  	private cartoS: CartoService
  ) { }

  openDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {};
  	dialogConfig.width = '485px';
  	dialogConfig.height = (this.cartoS.mapview.nativeElement.offsetHeight - 11)+'px';
  	dialogConfig.hasBackdrop = false;
  	dialogConfig.position = {right: '4px', top: '70px'};

    const dialogRef = this.dialog.open(RightPanelDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}



/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-fond-plan-dialog',
  templateUrl: 'right-panel.dialog.html',
  styleUrls: ['./right-panel.dialog.scss']
})
export class RightPanelDialog implements OnInit {

  constructor (
    public dialogRef: MatDialogRef<RightPanelDialog>,
    private cartoS: CartoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}