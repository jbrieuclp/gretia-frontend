import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class FileInsertComponent implements OnInit {

	fichier: any;
	fields: any[] = [];

  constructor(
  	private importS: ImportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
      this.getFichier(Number(id_fichier));
      this.getFields(Number(id_fichier));
    } else { 
      this.router.navigate(['/import']); 
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
  	this.importS.getFields(id, true) //only-mapped = true)
  				.pipe(
  					map(fields => {
  						//filtre des champs qui ne sont pas intégrable dans la synthèse
  						return fields.filter(field => field.fieldFSD.exportLib !== null);
  					})
  				)
          .subscribe(
            (fields: any) => this.fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }
}
