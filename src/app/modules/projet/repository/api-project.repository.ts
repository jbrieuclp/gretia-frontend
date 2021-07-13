import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { AppConfig } from '../../../shared/app.config';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ApiProjectRepository {

	httpUrlBase: string;
  url_backend: string;
  // constructeur ...
  constructor(protected http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
    this.url_backend = AppConfig.URL_BACKEND;
  }

  /** PUT personnes par ID (cd_nom) **/
  get(id: string, params = {}): Observable<any> {
    const url = `${this.url_backend}${id}`;
    const options = {params: params};
    return this.http.get(url, options);
  }

  patch(id: string, data: any): Observable<any> {
    const url = `${this.url_backend}${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, HTTP_OPTIONS);
  }

  /** PUT personnes par ID (cd_nom) **/
  put(id: string, update: any): Observable<any> {
    const url = `${this.url_backend}${id}`;
    const options = JSON.stringify(update);
    return this.http.put(url, options);
  }

  /** DELETE delete Localisation **/
  delete(id): Observable<any> {
    const url = `${this.url_backend}${id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  // /** DELETE personnes par ID (cd_nom) **/
  // delete(category: Category): Observable<Boolean> {
  //   const url = this.httpUrlBase + '/categorie/'+category.id;
  //   const options = {};
  //   return this.http
  //     .delete(url, options)
  //     .pipe( 
  //       map((res: Boolean) => { 
  //         return res;
  //       })
  //       , retry(3)/*, catchError(this.handleError('deleteHero'))*/ );
  // }

}