import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { 
  debounceTime, 
  map, 
  distinctUntilChanged, 
  switchMap, 
  catchError, 
  retry 
} from 'rxjs/operators';


import { AppConfig } from '../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Organisme {
  id?: number,
  nom?: string,
  sigle?: string,
  projetsFinances?: any,
  projetsTechniques?: any
}

@Injectable()
export class OrganismeRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET personnes par ID (cd_nom) **/
  organismes(limit?: number): Observable<Organisme[]> {
  	const url = this.httpUrlBase + '/organismes';
  	const options = {};
    return this.http
    	.get(url, options)
    	.pipe(
        map((res: Organisme[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  get(id: number): Observable<Organisme> {
    const url = this.httpUrlBase + '/organisme/'+id;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Organisme) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  post(data: Organisme): Observable<Organisme> {
    const url = this.httpUrlBase + '/organisme';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options)
      .pipe(
        map((res: Organisme) => { 
          return res;
        })
       );
  }

  /** PUT personnes par ID (cd_nom) **/
  put(init: Organisme, update: Organisme): Observable<Organisme> {
    const url = this.httpUrlBase + '/organisme/'+init.id;
    const options = JSON.stringify(update);
    return this.http
      .put(url, options)
      .pipe(
        map((res: Organisme) => { 
          return res;
        })
       );
  }

  /** DELETE personnes par ID (cd_nom) **/
  delete(organisme: Organisme): Observable<Boolean> {
    const url = this.httpUrlBase + '/organisme/'+organisme.id;
    const options = {};
    return this.http
      .delete(url, options)
      .pipe( 
        map((res: Boolean) => { 
          return res;
        })
        , retry(3)/*, catchError(this.handleError('deleteHero'))*/ );
  }

  /* 
  * GET taxon whose name contains search term 
  * Observe terms, au changement execute switchMap
  */
  search(terms: Observable<any[]>) {
    return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          return term.length >= 2 ?
            this.searchEntries(term) : [];
        })
      );
  }

  searchEntries(term) {
    const url = this.httpUrlBase + '/organismes/recherche';
    const options = term ? 
     { params: new HttpParams().set('term', term) } : {};

    return this.http
        .get(url, options)
        .pipe(
          map((response: Response) => { 
            return response;
          })
        );
  }

}