import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Personne } from './person.repository';
import { Mission } from './mission.repository';

import { AppConfig } from '../../../shared/app.config';

export interface Travail {
  id?: number,
  mission?: any,
  personne?: any,
  date?: Date,
  categorie?: any,
  duree?: number
}

export interface TravailCategorie {
  id?: number,
  libelle?: string,
  ordre?: number
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class SuiveuseRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET personnes par ID (cd_nom) **/
  dashboard(user?: string): Observable<any> {
    let user = user||null
  	const url = `${this.httpUrlBase}/suiveuse/personne/${user}`;
    return this.http
    	.get(url, httpOptions)
    	.pipe(
        map(res => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  getCategories(limit?: number): Observable<TravailCategorie[]> {
    const url = `${this.httpUrlBase}/suiveuse/categories`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((res: TravailCategorie[]) => { 
          return res;
        })
        , retry(3)
       );
  }

}