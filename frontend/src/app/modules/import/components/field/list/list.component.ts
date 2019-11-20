import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'

import { ImportService } from '../../../services/import.service';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-import-field-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FieldListComponent implements OnInit, OnDestroy {

	_fields: any[] = [];

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

  get $field() {
    return this.fieldS.field.getValue();
  }

  constructor(
  	private route: ActivatedRoute,
  	private importS: ImportService,
    private fieldS: FieldService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
    	this.getFields(Number(id_fichier));
    }
  }

  ngOnDestroy() {
    this.fieldS.reset();
  }

  getFields(id) {
  	this.importS.getFields(id)
          .subscribe(
            (fields: any) => this._fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }

  loadValues(field) {
    this.fieldS.field = field;
  }


}
