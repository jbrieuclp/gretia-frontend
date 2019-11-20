import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss']
})
export class FieldObserversComponent implements OnInit, OnDestroy {

	fichier: Observable<any>;
	error: any;
	field: any;
	raw_data: any;
	observers: Observable<any[]>;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private importS: ImportService,
  	private fieldS: FieldService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
	  	this.error = null;
	  	this.raw_data = this.fieldS.values;
    	this.fichier = this.importS.getFichier(Number(id_fichier));
  		this.getField(Number(id_fichier));
  		//chargement des observateurs à la récuperation de l'info du fichier correspondant
  		this.fieldS.field.pipe(
  			filter(field => field !== null )
  		).subscribe(
  			field => this.getObservers(field.id)
  		);
    } else { 
    	this.router.navigate(['/import']); 
    }

  }

  ngOnDestroy() {
  	this.fieldS.reset();
  }

  getField(id_fichier) {
  	this.importS.getFieldByFSD(id_fichier, '__OBSERVERS__')
  									.subscribe(
  										field => {
  											this.fieldS.field = field;
  										}, 
  										error => this.error = error
  									);
  }

  getObservers(id_field) {
  	console.log('plop');
  	this.importS.getObservers(id_field)
  									.subscribe(
  										observers => {
  											this.observers = observers;
  										}, 
  										error => this.error = error
  									);
  }

}
