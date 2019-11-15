import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FichierService } from '../../../services/fichier.service';

@Component({
  selector: 'app-import-field-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FieldListComponent implements OnInit {

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

  set fields(fields): void { this._fields = fields; }

  constructor(
  	private route: ActivatedRoute,
  	private fichierS: FichierService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
    	this.getFields(Number(id_fichier));
    }
  }

  getFields(id) {
  	this.fichierS.getFields(id)
          .subscribe(
            (fields: any) => this._fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }

}
