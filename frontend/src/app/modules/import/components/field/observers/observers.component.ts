import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss'],
  providers: [FileService]
})
export class FieldObserversComponent implements OnInit, OnDestroy {

	fichier: any;
	error: any;
	raw_data: any;
	_observers: any[];

  get good_observers(): any[] {
    if (!this._observers || this._observers === null) return [];
    return this._observers.filter(observer=>observer.ok);
  }

  get good_observers_multi_bd(): any[] {
    if (!this._observers || this._observers === null) return [];
    return this._observers.filter(observer=>observer.ok && observer.observers_bd.length > 1);
  }

  get bad_observers(): any[] {
    if (!this._observers || this._observers === null) return [];
    return this._observers.filter(observer=>!observer.ok);
  }

  set observers(observers: any[]) {
    this._observers = observers;
  }

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private importS: ImportService,
  	private fieldS: FieldService,
    private fileS: FileService
  ) { }

  ngOnInit() {
    this.error = null;
    this.raw_data = this.fieldS.values;

    this.fileS.file
          .pipe(
            filter(fichier => fichier !== null )
          )
          .subscribe(fichier=>{
            this.fichier = fichier;
            this.getObserversField()
          });

  		//chargement des observateurs à la récuperation de l'info du fichier correspondant
		this.fieldS.field
          .pipe(
      			filter(field => field !== null )
      		).subscribe(
      			field => this.getObservers(field.id)
      		);
  }

  ngOnDestroy() {
  	this.fieldS.reset();
  }

  /**
  *  Retourne le champ correspondant au FSD __OBSERVERS__
  */
  getObserversField() {
  	this.importS.getFieldByFSD(this.fichier.id, '__OBSERVERS__')
  									.subscribe(
  										field => {
  											this.fieldS.field = field;
  										}, 
  										error => this.error = error
  									);
  }

  /**
  *  Retourne les valeurs du champs osbervateur
  *  Retourne une liste des osbervateurs découpés par le pipe
  */
  getObservers(id_field) {
  	this.importS.getObservers(id_field)
  									.subscribe(
  										observers => {
  											this.observers = observers;
  										}, 
  										error => this.error = error
  									);
  }

  selectionChange($event) {
    let field = this.fieldS.field.getValue();
    this.observers = null;
    this.getObservers(field.id);
  }
}
