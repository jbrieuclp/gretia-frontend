import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import { Taxon } from '../taxon.model';
import { Change } from '../change.model';

import { AppConfig } from '../../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class TaxonRepository {

  httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_API_MT;
  }

  /** GET taxon par ID (cd_nom) **/
  getTaxon(cd_nom: number): Observable<Taxon> {
  	const taxonUrl = this.httpUrlBase + '/taxons/' + cd_nom;
  	const options = {};
    return this.http
    	.get(taxonUrl, options)
    	.pipe(
        map((response: Response): Taxon => { 
      		return new Taxon().deserialize(response);
      	})
      );
  }

	searchTaxons(term) {
		const taxonUrl = this.httpUrlBase + '/nom_complets/recherche';
	  const options = term ? 
	   { params: new HttpParams().set('name', term) } : {};

    return this.http
        .get(taxonUrl, options)
        .pipe(
          map((response: Response) => { 
  	    		return response;
  	    	})
        );
  }

  /** GET taxon par ID (cd_nom) **/
  getChangement(cd_nom: number, version: number): Observable<Change[]> {
    const taxonUrl = this.httpUrlBase + '/taxref-' + version + '/taxons/' + cd_nom + '/change';
    const options = {};
    return this.http
      .get(taxonUrl, options)
      .pipe(
        map((response: Array<object>): Change[] => { 
          return response.map((json: object) => new Change().deserialize(json));
        })
      );
  }

  /** GET taxon par ID (cd_nom) **/
  postTaxrefMatch(taxons: any): Observable<any> {
    const url = `${this.httpUrlBase}/name-checker`;
    const sources = taxons;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

/*  getTaxonFromTaxrefV(version:number, cd_nom:number) {
    const taxonUrl = this.httpUrlBase + '/taxref' + version + '/' + cd_nom;
    let params: HttpParams = new HttpParams();
    return this.http.get<Taxon>(taxonUrl, {params: params});
  }*/
    
// Après (avec les Promesses)
/*getTaxons(cd_nom:number): Promise<Taxon> {
  const url = 'http://taxref-match.loc/app_dev.php/api/' + cd_nom;
  return this.http.get<Taxon>(url)
             .toPromise()
             .then(response => response.json() as Taxon)
             .catch(this.handleError);
}*/
/*	private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an ErrorObservable with a user-facing error message
	  return new ErrorObservable(
	    'Something bad happened; please try again later.');
	};
*/
}