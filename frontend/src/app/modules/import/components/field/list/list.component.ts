import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToolsboxComponent } from '../toolsbox/toolsbox.component';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-import-field-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [FileService]
})
export class FieldListComponent implements OnInit, OnDestroy {

	cardHeight: any;
  cardContentHeight: any;
  _fields: any[] = [];
  field: any = null;

  get fields(): any[] {
    return this._fields.sort((t1, t2) => {
      const name1 = t1.champ.toLowerCase();
      const name2 = t2.champ.toLowerCase();
      if (name1 > name2) { return 1; }
      if (name1 < name2) { return -1; }
      return 0;
    })||[];
  }

  set fields(fields) { this._fields = fields; }

  get $badValues() {
    return this.fieldS.values.getValue().filter(value => !value.ok);
  }

  get $goodValues() {
    return this.fieldS.values.getValue().filter(value => value.ok);
  }

  constructor(
  	private route: ActivatedRoute,
  	private importS: ImportService,
    public fileS: FileService,
    private fieldS: FieldService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //refreshFields(true) = champs mappé uniquement
  	this.fileS.mappedFields.subscribe(fields=>this._fields = fields);

    this.fieldS.field.subscribe(field=>this.field = field);

    this.cardHeight = window.innerHeight-130;
    this.cardContentHeight = this.cardHeight-70;
  }

  ngOnDestroy() {
    this.fieldS.reset();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cardHeight = window.innerHeight-130;
    this.cardContentHeight = this.cardHeight-70;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ToolsboxComponent);
  }

  loadValues(field) {
    this.fieldS.field = field;
  }

  switchStatut(event, field) {
    let request = {check: event};
    this.importS.patchField(field.id, request)
                    .subscribe(
                      result => {
                        field.check = result.check;
                        this.fileS.refreshFields(this._fields);
                      },
                      error => { 
                        this._snackBar.open(error.error.message, 'Fermer', {
                          duration: 4000,
                          verticalPosition: 'top'
                        }); 
                      });
  }

}
