import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { CartoService } from '../../../services/carto.service';

@Component({
  selector: 'app-carto-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  
  data: any = {}

  constructor(
  	public dialog: MatDialog,
  	private cartoS: CartoService
  ) {}

  ngOnInit() {
    this.data.active = new BehaviorSubject<boolean>(true);
  }

  ngAfterViewInit() {
    setTimeout(() => {this.openDialog();}, 0);
  }

  openDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = this.data;
  	dialogConfig.width = '485px';
  	dialogConfig.height = (this.cartoS.mapview.nativeElement.offsetHeight - 11)+'px';
  	dialogConfig.hasBackdrop = false;
    dialogConfig.closeOnNavigation = true;
  	dialogConfig.position = {right: '4px', top: '70px'};

    const dialogRef = this.dialog.open(RightPanelDialog, dialogConfig);
  }

  ngOnDestroy(): void {
    //fermeture de l'IB
    this.data.active.next(false);
  }

}



/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-fond-plan-dialog',
  templateUrl: 'right-panel.dialog.html',
  styleUrls: ['./right-panel.dialog.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightPanelDialog implements OnInit {

  constructor (
    public dialogRef: MatDialogRef<RightPanelDialog>,
    private cartoS: CartoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.data.active.subscribe((res: boolean) => {
      if (!res) {
        this.dialogRef.close();
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}