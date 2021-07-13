import { Component, OnInit, Input, Output, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FieldService } from '../field.service';

@Component({
  selector: 'app-import-view-loc-table-dialog',
  templateUrl: 'loc-table.dialog.html',
  //styleUrls: ['dialog.scss']
})
export class LocTableDialog implements OnInit {

  fichier: any;
  filter: any = null;

  constructor (
    public dialogRef: MatDialogRef<LocTableDialog>,
    private fieldS: FieldService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.fichier = this.data.fichier;
    this.filter = this.data.filter;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}