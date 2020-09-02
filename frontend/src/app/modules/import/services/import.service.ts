import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map } from 'rxjs/operators';

import * as _ from 'lodash';

import { AppConfig } from '../../../shared/app.config';

const httpOptions = {
  headers: new HttpHeaders({
  //  'Content-Type':  'application/json',
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
  countRow(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/count`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  addField(id: number, params: any): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/add-field`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  patchField(id: number, params: any): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}`;
    const sources = params;
    return this.http
      .patch(url, sources, httpOptions)
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
  updateFieldValues(id: number, params: any[]): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/values`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
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
  regexpReplaceFieldElement(id: number, params: any, returnList: 't'|'f' = 't'): Observable<any> {
    const url = `${this.httpUrlBase}/field/${id}/regexp-replace?values=${returnList}`;
    let sources = params;
    return this.http
      .patch(url, sources, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getFields(id: number, mapped: boolean = false): Observable<any> {
    let url = `${this.httpUrlBase}/fichier/${id}/fields`;
    if (mapped) {
      url = url+'?only-mapped=true';
    }
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
  getFieldsValues(fields_id: number[]): Observable<any> {
    const params = fields_id.map(field_id => 'fields[]=' + field_id).join('&');
    const url = `${this.httpUrlBase}/fields/values?${params}`;
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

  /** GET taxon par ID (cd_nom) **/
  createObserver(params: any): Observable<any> {
    const url = `${this.httpUrlBase}/observer`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }


  /** GET taxon par ID (cd_nom) **/
  getLocalisationValues(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/localisations`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
        retry(3)
      );
  }

  /** Mappe un champ non mappé **/
  tableView(fichier_id: number, params, sort, direction, index, limit): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/view?sort=${sort}&direction=${direction}&index=${index}&limit=${limit}`;
    const sources = params;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** Mappe un champ non mappé **/
  patchTableCell(fichier_id: number, row_id: number, params: any = {}): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/row/${row_id}`;
    const sources = params;
    return this.http
     .patch(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** Recherche les lignes en doublons dans le fichier **/
  checkDuplicateLines(fichier_id: number, fields): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/duplicate-lines/check`;
    const sources = fields;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** Marque les lignes en doublons dans le fichier **/
  tagDuplicateLines(fichier_id: number, fields): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/duplicate-lines/tag`;
    const sources = fields;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** Recherche les lignes en doublons avec GeoNature **/
  checkExistsInDB(fichier_id: number, fields): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/exists-in-db/check`;
    const sources = fields;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** Marque les lignes en doublons avec GeoNature **/
  tagExistsInDB(fichier_id: number, fields): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${fichier_id}/exists-in-db/tag`;
    const sources = fields;
    return this.http
     .post(url, sources, httpOptions)
     .pipe(
       map(res => res), 
       retry(3)
     );
  }

  /** GET taxon par ID (cd_nom) **/
  getRegrouping(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/releves/info`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  setRegrouping(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/regrouping`;
    return this.http
      .post(url, {}, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  setOberversIds(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/observers/set-id`;
    return this.http
      .post(url, {}, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  switchStatus(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/switch-status`;
    return this.http
      .post(url, {}, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getLocalisationsInfo(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/localisations/info`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  getLocalisationsGeoms(id: number): Observable<any> {
    const url = `${this.httpUrlBase}/fichier/${id}/localisations/geoms`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  postTaxrefMatch(taxons: any): Observable<any> {
    const url = `${AppConfig.URL_API_MT}/name-checker`;
    const sources = taxons;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map(res => res), 
       // retry(3)
      );
  }

}
