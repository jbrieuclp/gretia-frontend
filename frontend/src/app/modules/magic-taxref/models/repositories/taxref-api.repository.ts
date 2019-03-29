import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import { AppConfig } from '../../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class TaxrefApiRepository {

  httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) { }

  /** GET taxon par ID (cd_nom) **/
  getMedia(cd_ref: number): Observable<any> {
    const url = 'https://taxref.mnhn.fr/api/taxa/'+cd_ref+'/media';

    return this.http
      .get(url, httpOptions)
      .pipe(
        map((response: object): any => { 
          return response;
        })
       );
  }
}