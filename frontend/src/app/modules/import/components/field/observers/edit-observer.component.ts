import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map, startWith, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import { FieldService } from '../field.service';
import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-edit-observer',
  templateUrl: './edit-observer.component.html',
  styleUrls: ['./edit-observer.component.scss']
})
export class EditObserverComponent implements OnInit {

	@Input() observer: any;
//  @ViewChild('searchInput') inputEl:ElementRef;
	displayForm: boolean;
	private _closeAction: boolean;
	searchValue: string;
	searchTerm$ = new Subject<any>();
  isOpen: boolean = false;
  isWaiting: boolean = false;
  results: any[] = [];
  private field: any;

  constructor(
  	private fieldS: FieldService,
    private importS: ImportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.displayForm = false;
  	this.field = this.fieldS.field.getValue();
  	this.initForm();

  //callback d'attente
    this.searchTerm$
      .subscribe(res => {
        this.results = []; 
        this.isWaiting = true; 
      });

    //callback de resultat
    this.searchObservers(this.searchTerm$)
      .subscribe((results: any[]) => {
        this.isWaiting = false;
        this.results = results;
      });

  }

  initForm() {
  	this.searchValue = this.observer.observer;
  	this.results = this.observer.propositions;
  }

  openForm(forceClose: boolean = false) {
  	if (!this._closeAction) {
  		this.displayForm = true;
  	}
  	this._closeAction = false;
  }

  closeForm() {
  	this.displayForm = false;
  	this._closeAction = true;
  	this.initForm();
  }

  /* GET taxon whose name contains search term */
	searchObservers(terms: Observable<string>): Observable<any[]> {
	  return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
        	return term.length > 3 ?
         		this.importS.searchFSDValues(this.field.fieldFSD.id, term) : of([]);
        })
      );
	}

  submit() {
  	let request = {search: this.observer.observer, replace: this.searchValue};
  	this.importS.replaceFieldElement(this.field.id, request, 'f')
  									.subscribe(
  										result => {
  											this.observer.observer = result;
  											this.displayForm = false;
  										},
  										error => { 
  											this._snackBar.open(error.error.message, 'Fermer', {
										      duration: 4000,
										      verticalPosition: 'top'
										    }); 
	  									})
  }

}
