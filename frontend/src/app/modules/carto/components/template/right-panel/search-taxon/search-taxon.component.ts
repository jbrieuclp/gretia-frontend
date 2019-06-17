import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, retry, tap } from 'rxjs/operators';

import { TaxonService } from './taxon.service';

const DATA = [{"nom_valide":{"cd_ref":144260,"nom_valide":"Bellis perennis var. perennis L., 1753","nom_vern":null},"synonymes":[{"cd_nom":144258,"nom_latin":"Bellis perennis var. hirsuta","decouvreur":"Beck, 1893"},{"cd_nom":144259,"nom_latin":"Bellis perennis var. meridionalis","decouvreur":"Favrat ex Gremli, 1885"}]},{"nom_valide":{"cd_ref":144257,"nom_valide":"Bellis perennis var. caulescens Rochebr. & Sav., 1861","nom_vern":null},"synonymes":[{"cd_nom":132104,"nom_latin":"Bellis perennis subsp. hybrida","decouvreur":"auct. non (Ten.) Nyman, 1879"}]},{"nom_valide":{"cd_ref":85730,"nom_valide":"Bellis bernardii Boiss. & Reut., 1852","nom_vern":"P\u00e2querette de Bernard"},"synonymes":[{"cd_nom":132103,"nom_latin":"Bellis perennis subsp. bernardii","decouvreur":"(Boiss. & Reut.) Rouy, 1903"}]},{"nom_valide":{"cd_ref":85740,"nom_valide":"Bellis perennis L., 1753","nom_vern":"P\u00e2querette"},"synonymes":[{"cd_nom":152821,"nom_latin":"Bellis perennis proles pumila","decouvreur":"(Arv.-Touv. & Dupuy) Rouy, 1903"},{"cd_nom":132105,"nom_latin":"Bellis perennis subsp. perennis","decouvreur":"L., 1753"}]},{"nom_valide":{"cd_ref":85745,"nom_valide":"Bellis sylvestris Cirillo, 1792","nom_vern":"P\u00e2querette des bois, P\u00e2querette d'Automne"},"synonymes":[{"cd_nom":132106,"nom_latin":"Bellis perennis subsp. sylvestris","decouvreur":"(Cirillo) Bonnier & Layens, 1894"}]}];

@Component({
  selector: 'app-carto-search-taxon',
  templateUrl: './search-taxon.component.html',
  styleUrls: ['./search-taxon.component.scss'],
  providers: [TaxonService]
})
export class SearchTaxonComponent implements OnInit {

  searchTerm$ = new Subject<any>();
  isOpen: boolean;
  isWaiting: boolean = false;
  autocomplete: Array<any> = DATA;
  textTaxon: string = '';
  @Output() 
  cdTaxonChange: EventEmitter<number> = new EventEmitter();

  constructor( 
  	private http: HttpClient,
  	private taxonS: TaxonService
  ) { 
      //callback de resultat
      this.searchTaxons(this.searchTerm$).subscribe(results => true);
  }

  ngOnInit() {}

  /* GET taxon whose name contains search term */
	searchTaxons(terms: Observable<any[]>) {
	  return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
        	if (term.length >= 5) {
        		this.isWaiting = true;
        		return this.taxonS.searchTaxonsEntries(term);
        	} else { return []; }
        }),
    		tap({
				    next: (val) => {
				    	this.isWaiting = false;
				    	this.autocomplete = val;
				    },
				    error: (error) => {
				    	this.isWaiting = false;
				    	this.autocomplete = [];
				      console.log('on error', error.message);
				    }
				  })
      );
	}

  selectTaxon(val: any){
  	console.log(val);
    this.textTaxon = val.nom_complet;
    this.cdTaxonChange.emit(val.cd_nom);
  }

}
