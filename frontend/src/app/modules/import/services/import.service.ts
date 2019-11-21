import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map } from 'rxjs/operators';

import * as _ from 'lodash';

import { AppConfig } from '../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ImportService {

  httpUrlBase: string;

  constructor( 
  	private http: HttpClient,
  ) {
  	this.httpUrlBase = AppConfig.URL_API_IMPORT;
  }

  /**************
  *
  *  Lien API
  *
  ***************/

  /** GET taxon par ID (cd_nom) **/
  getFichiers(): Observable<any> {
    const url = `${this.httpUrlBase}/fichiers`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFichier(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  patchFieldValue(id: number, params: any): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/value`;
    const sources = params;
    return this.http
      .patch(url, sources, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  replaceFieldElement(id: number, params: any, returnList: 't'|'f' = 't'): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/replace?values=${returnList}`;
    let sources = params;
    return this.http
      .patch(url, sources, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFields(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/fields`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFSDFields(): Observable<any> {
    const url = `${this.httpUrlBase}/fsd-fields`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFieldByFSD(id: number, champ: string): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/field-by-fsd`;
    const params = { params: new HttpParams().set('champ', champ) };
    return this.http
      .get(url, params)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFSDFieldValues(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fsd-field/${id}/values`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  searchFSDValues(id: number, term: string): Observable<any>  {
    const taxonUrl = `${this.httpUrlBase}/fsd-field/${id}/recherche`;
    const options = term ? 
     { params: new HttpParams().set('term', term) } : {};

    return this.http
        .get(taxonUrl, options)
        .pipe(
          map(response => response),
          retry(3)
        );
  }

  /** Mappe un champ non mappé **/
  postField(fichier_id: number, params): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/field`;
    const sources = params;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** MAJ d'un champ mappé **/
  patchFieldFSD(field_id: number, fsd_id: number): Observable<any> {
    const url = `${this.httpUrlBase}/field/${field_id}/fsd/${fsd_id}`;
    const sources = {};
    return this.http
     .patch(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** DELETE field par ID **/
  deleteField(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      )
  }

  /** GET taxon par ID (cd_nom) **/
  getFieldValues(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/values`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getObservers(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/observers`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

//  /** GET taxon par ID (cd_nom) **/
//  public getFeatureInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET taxon par ID (cd_nom) **/
//  public getObservateursInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/observateurs`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET taxon par ID (cd_nom) **/
//  public getJDDsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/datasets`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET taxon par ID (cd_nom) **/
//  public getCommunesInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/communes`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET taxon par ID (cd_nom) **/
//  public getCountsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/counts`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET taxon par ID (cd_nom) **/
//  public getTaxonsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
//    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/taxons`;
//    const sources = params;
//    return this.http
//      .post(url, sources, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }
//
//  /** GET AvailablesScales **/
//  public getAvailablesScales(): Observable<any> {
//    const url = `${this.httpUrlBase}/scales`;
//    return this.http
//      .get(url, httpOptions)
//      .pipe(
//        map(res => res), 
//        retry(3)
//      );
//  }

}
