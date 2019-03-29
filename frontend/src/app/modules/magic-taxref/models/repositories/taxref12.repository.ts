import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Taxref12 } from '../taxref12.model';

import { AppConfig } from '../../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class Taxref12Repository {


	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_API_MT;
  }

  /** GET taxon par ID (cd_nom) **/
  getTaxon(cd_nom: number): Observable<Taxref12> {
  	const taxonUrl = this.httpUrlBase + '/taxref/12/taxons/' + cd_nom;
  	const options = {};
    return this.http
    	.get(taxonUrl, options)
    	.pipe(
    		map((response: object): Taxref12 => { 
	    		return new Taxref12().deserialize(response);
	    	})
	   	);
  }

  /** GET taxon par ID (cd_ref) **/
  getSynonymes(cd_ref: number): Observable<Taxref12[]> {
  	const taxonUrl = this.httpUrlBase + '/taxref/12/taxons/' + cd_ref + '/synonymes';
  	const options = {};
    return this.http
    	.get(taxonUrl, options)
    	.pipe(
    		map((response: Array<object>): Taxref12[] => { 
	    		return response.map((json: object) => new Taxref12().deserialize(json));
	    	})
	    );
  }

  getTaxonFromTaxrefV(version:number, cd_nom:number) {
    let params: HttpParams = new HttpParams();
    return this.http.get<Taxref12>(`http://taxref-match.loc/app_dev.php/api/taxref${version}/${cd_nom}`, {params: params})
                                    ;
  }

  /** GET taxon par ID (cd_ref) **/
  getParents(cd_ref: number): Observable<Taxref12[]> {
    const taxonUrl = this.httpUrlBase + '/taxref/12/taxons/' + cd_ref + '/parents';
    const options = {};
    return this.http
      .get(taxonUrl, options)
      .pipe(
        map((response: Array<object>): Taxref12[] => { 
          return response.map((json: object) => new Taxref12().deserialize(json));
        })
      );
  }

  /** GET childrens par ID (cd_ref) **/
  getChildrens(cd_ref: number): Observable<Taxref12[]> {
    const taxonUrl = this.httpUrlBase + '/taxref/12/taxons/' + cd_ref + '/childrens';
    const options = {};
    return this.http
      .get(taxonUrl, options)
      .pipe(
        map((response: Array<object>): Taxref12[] => { 
          return response.map((json: object) => new Taxref12().deserialize(json));
        })
      );
  }
    
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
	};*/

}