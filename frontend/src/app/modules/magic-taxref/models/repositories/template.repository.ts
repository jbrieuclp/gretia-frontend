import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

import { Taxon } from '../taxon.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class VersioningService {


	// constructeur ...
	constructor(private http: HttpClient) { }


	/** POST: add a new hero to the database */
/*	addHero (hero: Hero): Observable<Hero> {
	  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
	    .pipe(
	      catchError(this.handleError('addHero', hero))
	    );
	}
	//using : this.heroesService.addHero(newHero)
	//					.subscribe(hero => this.heroes.push(hero));
*/


	/** DELETE: delete the hero from the server */
/*
	deleteHero (id: number): Observable<{}> {
	  const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
	  return this.http.delete(url, httpOptions)
	    .pipe(
	      catchError(this.handleError('deleteHero'))
	    );
	}
	//using : this.heroesService.deleteHero(hero.id).subscribe();
*/

	/** PUT: update the hero on the server. Returns the updated hero upon success. */
/*
	updateHero (hero: Hero): Observable<Hero> {
	  return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
	    .pipe(
	      catchError(this.handleError('updateHero', hero))
	    );
	}
*/

	/* GET heroes whose name contains search term */
/*
	searchHeroes(term: string): Observable<Hero[]> {
	  term = term.trim();

	  // Add safe, URL encoded search parameter if there is a search term
	  const options = term ? 
	   { params: new HttpParams().set('name', term) } : {};

	  return this.http.get<Hero[]>(this.heroesUrl, options)
	    .pipe(
	      catchError(this.handleError<Hero[]>('searchHeroes', []))
	    );
	}
*/


	/*getTaxon(id_nomenclature: number, regne?: string, group2_inpn?: string) {
    let params: HttpParams = new HttpParams();
    regne ? params = params.set('regne', regne) : params = params.set('regne', '');
    group2_inpn ? params = params.set('group2_inpn', group2_inpn) : params = params.set('group2_inpn', '');
    return this._http.get<any>(`${AppConfig.API_ENDPOINT}/nomenclatures/nomenclature/${id_nomenclature}`, {params: params});
    }*/

  getTaxon(cd_nom:number) {
    let params: HttpParams = new HttpParams();
    return this.http.get(`http://taxref-match.loc/app_dev.php/api/${cd_nom}`, {params: params});
  }

  getTaxonFromTaxrefV(version:number, cd_nom:number) {
    let params: HttpParams = new HttpParams();
    return this.http.get<Taxon>(`http://taxref-match.loc/app_dev.php/api/taxref${version}/${cd_nom}`, {params: params})
                                    ;
  }
    
// Après (avec les Promesses)
/*getTaxons(cd_nom:number): Promise<Taxon> {
  const url = 'http://taxref-match.loc/app_dev.php/api/' + cd_nom;
  return this.http.get<Taxon>(url)
             .toPromise()
             .then(response => response.json() as Taxon)
             .catch(this.handleError);
}*/

}