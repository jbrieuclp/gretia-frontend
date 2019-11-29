import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { LocalisationService } from './localisation.service';

@Component({
  selector: 'app-import-field-localisations',
  templateUrl: './localisations.component.html',
  styleUrls: ['./localisations.component.scss']
})
export class FieldLocalisationsComponent implements OnInit {

	fichier: Observable<any>;
	error: Observable<any>;
	raw_data: any;
	_localisations: any[];

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private importS: ImportService,
  	private localisationS: LocalisationService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
	  	this.error = null;
    	this.localisationS.fichierId = Number(id_fichier);
    	this.error = this.localisationS.error;
    } else { 
    	this.router.navigate(['/import']); 
    }
  }

}
