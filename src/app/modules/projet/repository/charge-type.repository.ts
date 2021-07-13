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

export interface ChargeTypeRef {
  "@id"?: string;
  "@type"?: string;
  "id"?: number;
  "label"?: string;
  "description"?: string;
  "orderBy"?: number;
  "isPerDay"?: boolean;
  "chargeTypes"?: ChargeType[];
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
};

export interface ChargeType {
  "@id"?: string;
  "@type"?: string;
  "id"?: number;
  "chargeTypeRef"?: ChargeTypeRef;
  "applicationStart"?: Date;
  "applicationEnd"?: Date;
  "unitCost"?: number[];
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
};

@Injectable()
export class ChargeTypeRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  ///////////////////////
  //  TYPE PROJET REF  //
  ///////////////////////
  /** GET list of ChargeTypeRef **/
  chargeTypeRefs(params = {}): Observable<ChargeTypeRef[]> {
    const url = `${this.httpUrlBase}/charge_type_refs`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: ChargeTypeRef[]) => res), 
        retry(3)
      );
  }

  /** GET uniq of ChargeTypeRef **/
  chargeTypeRef(id): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_type_refs/${id}`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: ChargeTypeRef) => res), 
        retry(3)
      );
  }

  /** POST create new ChargeTypeRef **/
  createChargeTypeRef(data: ChargeTypeRef): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_type_refs`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, httpOptions);
  }

  /** POST update ChargeTypeRef **/
  updateChargeTypeRef(id, data: ChargeTypeRef): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_type_refs/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, httpOptions);
  }

  /** DELETE delete ChargeTypeRef **/
  deleteChargeTypeRef(id): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_type_refs/${id}`;
    return this.http.delete(url, httpOptions);
  }

  ///////////////////////
  //  TYPE PROJET  //
  ///////////////////////
  /** GET list of ChargeType **/
  chargeTypes(params): Observable<ChargeType[]> {
    const url = `${this.httpUrlBase}/charge_types`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: ChargeType[]) => res), 
        retry(3)
      );
  }

  /** GET uniq of ChargeType **/
  chargeType(id): Observable<ChargeType> {
    const url = `${this.httpUrlBase}/charge_types/${id}`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: ChargeType) => res), 
        retry(3)
      );
  }

  /** POST add Salarie to Personne **/
  createChargeType(data: ChargeType): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_types`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, httpOptions);
  }

  /** DELETE remove Salarie to Personne **/
  deleteChargeType(id): Observable<ChargeTypeRef> {
    const url = `${this.httpUrlBase}/charge_types/${id}`;
    return this.http.delete(url, httpOptions);
  }
  
}