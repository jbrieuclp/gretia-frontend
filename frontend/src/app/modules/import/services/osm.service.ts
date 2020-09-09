import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map } from 'rxjs/operators';

const httpOptions = {
  /*headers: new HttpHeaders({
  //  'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })*/
};

@Injectable()
export class OSMService {

  httpUrlBase: string;

  constructor( 
  	private http: HttpClient,
  ) {
  	this.httpUrlBase = 'https://nominatim.openstreetmap.org';
  }

  /**************
  *
  *  Lien API
  *
  ***************/

  /** GET taxon par ID (cd_nom) **/
  updloadFile(data): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/upload`;
    return this.http
      .post(url, data, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  search(term): Observable<any> {
    const url = `${this.httpUrlBase}/search?format=json&limit=5&q=${term}`;
    return this.http
      .get(url);
  }

}
