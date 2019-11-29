import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormMapperComponent } from './form-mapper.component';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss']
})
export class FileMapperComponent implements OnInit {

	fichier: any;
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

  @ViewChildren('formMapper') formMappers: QueryList<FormMapperComponent>;

  constructor(
  	private route: ActivatedRoute,
  	private importS: ImportService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
    	this.getFichier(Number(id_fichier));
    	this.getFields(Number(id_fichier));
    }
  }

  getFichier(id) {
  	this.importS.getFichier(id)
          .subscribe(
            (fichier: any) => this.fichier = fichier,
            error => { /*this.errors = error.error;*/ }
          );
  }

  getFields(id) {
  	this.importS.getFields(id)
          .subscribe(
            (fields: any) => this._fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }

  /**
   * Action permettant de défaire le mappage d'un champ
   */
  removeMapping(field) {
    this.importS.deleteField(field.id)
          .subscribe(
            (result: boolean) => {
              if (result)  {
                field.id = null;
                field.description = null;
                field.fieldFSD = null;
                field.check = null;
              }
            },
            error => { /*this.errors = error.error;*/ }
          );
  }

  autoMapping() {
    this.formMappers.forEach((item: FormMapperComponent) => {
      item.autoMap();
    });
  }

  openFieldForm() {
    
  }

}
