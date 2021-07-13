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
  isPublic?: string,
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

  ////////////////////
  //  ORGANISME  //
  ////////////////////
  /** GET list of Organisme **/
  organismes(): Observable<Organisme[]> {
    const url = `${this.httpUrlBase}/organismes`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Organisme[]) => res), 
        retry(3)
      );
  }

  /** POST create new Organisme **/
  postOrganismes(data: Organisme): Observable<Organisme> {
    const url = `${this.httpUrlBase}/organismes`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, httpOptions);
  }

  /** POST update Organisme **/
  patchOrganismes(id, data: Organisme): Observable<Organisme> {
    const url = `${this.httpUrlBase}/organismes/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, httpOptions);
  }

  /** DELETE delete Organisme **/
  deleteOrganisme(id): Observable<Organisme> {
    const url = `${this.httpUrlBase}/organismes/${id}`;
    return this.http.delete(url, httpOptions);
  }

}