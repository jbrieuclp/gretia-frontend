import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AppConfig } from '../../../shared/app.config';
import { Personne, Travailleur } from './person.repository';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Mission {
  id?: number,
  libelle?: string,
  detail?: string,
  nbJour?: any,
  etat?: any,
  projet?: any,
  travailleurs?: any
  dateCreate?: any,
  compteCreate?: any,
  dateUpdate?: any,
  compteUpdate?: any
}

@Injectable()
export class MissionRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET all mission **/
  missions(limit?: number): Observable<Mission[]> {
  	const url = this.httpUrlBase + '/missions';
  	const options = {};
    return this.http
    	.get(url, options)
    	.pipe(
        map((res: Mission[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET mission par ID  **/
  get(id: number): Observable<Mission> {
    console.log("get");
    const url = this.httpUrlBase + '/mission/'+id;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((res: Mission) => res)
        , retry(3)
       );
  }

  /** POST mission par ID  **/
  post(data: Mission): Observable<Mission> {
    const url = this.httpUrlBase + '/mission';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options, httpOptions)
      .pipe(
        map((res: Mission) => { 
          return res;
        })
       );
  }

  /** PUT mission par ID  **/
  put(id: string, update: Mission): Observable<Mission> {
    update.id = Number(id);
    const url = this.httpUrlBase + '/mission/'+id;
    const options = JSON.stringify(update);
    return this.http
      .put(url, options, httpOptions)
      .pipe(
        map((res: Mission) => { 
          return res;
        })
       );
  }

  /** DELETE mission par ID **/
  delete(projet: Mission): Observable<Boolean> {
    const url = this.httpUrlBase + '/mission/'+projet.id;
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