import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { AppConfig } from '../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Etat {
  id?: number,
  libelle?: string,
  ordre?: string
}

@Injectable()
export class EtatRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET personnes par ID (cd_nom) **/
  etats(limit?: number): Observable<Etat[]> {
  	const url = this.httpUrlBase + '/etats';
  	const options = {};
    return this.http
    	.get(url, options)
    	.pipe(
        map((res: Etat[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  get(id: number): Observable<Etat> {
    const url = this.httpUrlBase + '/etat/'+id;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Etat) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  post(data: Etat): Observable<Etat> {
    const url = this.httpUrlBase + '/etat';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options)
      .pipe(
        map((res: Etat) => { 
          return res;
        })
       );
  }

  /** PUT personnes par ID (cd_nom) **/
  put(init: Etat, update: Etat): Observable<Etat> {
    const url = this.httpUrlBase + '/etat/'+init.id;
    const options = JSON.stringify(update);
    return this.http
      .put(url, options)
      .pipe(
        map((res: Etat) => { 
          return res;
        })
       );
  }

  /** DELETE personnes par ID (cd_nom) **/
  delete(etat: Etat): Observable<Boolean> {
    const url = this.httpUrlBase + '/etat/'+etat.id;
    const options = {};
    return this.http
      .delete(url, options)
      .pipe( 
        map((res: Boolean) => { 
          return res;
        })
        , retry(3)/*, catchError(this.handleError('deleteHero'))*/ );
  }

}