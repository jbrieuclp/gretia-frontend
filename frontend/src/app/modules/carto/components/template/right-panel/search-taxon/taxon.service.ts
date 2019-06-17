import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import { AppConfig } from '../../../../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class TaxonService {

  httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_API_CARTO;
  }

  /** GET taxon par ID (cd_nom) **/
  getTaxon(cd_nom: number): Observable<any> {
  	const taxonUrl = this.httpUrlBase + '/taxons/' + cd_nom;
  	const options = {};
    return this.http
    	.get(taxonUrl, options)
    	.pipe(
        map((response: Response) => response)
      );
  }

  /* GET taxon whose name contains search term */
	searchTaxons(terms: Observable<any[]>) {
	  return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
        	return term.length >= 5 ?
        		this.searchTaxonsEntries(term) : [];
        })
      );
	}

	searchTaxonsEntries(term) {
		const taxonUrl = this.httpUrlBase + '/taxons';
	  const options = term ? 
	   { params: new HttpParams().set('term', term) } : {};

    return this.http
        .get(taxonUrl, options)
        .pipe(
          map((response: Response) => response)
        );
  }
}