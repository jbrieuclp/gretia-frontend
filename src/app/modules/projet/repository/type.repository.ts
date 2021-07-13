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

export interface Type {
  id?: number,
  libelle?: string,
  ordre?: string
}

@Injectable()
export class TypeRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET personnes par ID (cd_nom) **/
  types(limit?: number): Observable<Type[]> {
  	const url = this.httpUrlBase + '/types';
  	const options = {};
    return this.http
    	.get(url, options)
    	.pipe(
        map((res: Type[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  get(id: number): Observable<Type> {
    const url = this.httpUrlBase + '/type/'+id;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Type) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  post(data: Type): Observable<Type> {
    const url = this.httpUrlBase + '/type';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options)
      .pipe(
        map((res: Type) => { 
          return res;
        })
       );
  }

  /** PUT personnes par ID (cd_nom) **/
  put(init: Type, update: Type): Observable<Type> {
    const url = this.httpUrlBase + '/type/'+init.id;
    const options = JSON.stringify(update);
    return this.http
      .put(url, options)
      .pipe(
        map((res: Type) => { 
          return res;
        })
       );
  }

  /** DELETE personnes par ID (cd_nom) **/
  delete(type: Type): Observable<Boolean> {
    const url = this.httpUrlBase + '/type/'+type.id;
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