import { Component, OnInit, Input, Output, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FieldService } from '../field.service';

@Component({
  selector: 'app-import-view-table-dialog',
  templateUrl: 'view-table.dialog.html',
  //styleUrls: ['dialog.scss']
})
export class ViewTableDialog implements OnInit {

  field: any;
  filter: any = {};

  constructor (
    public dialogRef: MatDialogRef<ViewTableDialog>,
    private fieldS: FieldService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.fieldS.field
                  .subscribe(field=>{
                    this.field = field;
                    this.filter[this.field.champ] = this.data.search;
                  });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}