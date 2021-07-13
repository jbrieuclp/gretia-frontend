import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AppConfig } from '../../../shared/app.config';
import { Task } from './task.repository';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Work {
  "@id"?: string;
  "@type"?: string;
  "id"?: number;
  "tache"?: Task;
  "salarie"?: string;
  "dateTravail"?: Date;
  "temps"?: number;
  "detail"?: string;
  "estNuit"?: boolean;
  "estWe"?: boolean;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}


@Injectable()
export class WorksRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  ////////////////////
  //  CONVENTIONS  //
  ////////////////////
  /** GET list of Work **/
  works(params = {}): Observable<Work[]> {
    const url = `${this.httpUrlBase}/works`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Work[]) => res), 
        retry(3)
      );
  }

  /** GET list of Work **/
  myWorks(params = {}): Observable<Work[]> {
    const url = `${this.httpUrlBase}/works/me`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Work[]) => res), 
        retry(3)
      );
  }

  /** GET one of Work **/
  work(id): Observable<Work> {
    const url = `${this.httpUrlBase}/works/${id}`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Work) => res), 
        retry(3)
      );
  }

  /** POST create new Work **/
  postWorks(data: Work): Observable<Work> {
    const url = `${this.httpUrlBase}/works`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, httpOptions);
  }

  /** POST create new Work **/
  postMyWorks(data: Work): Observable<Work> {
    const url = `${this.httpUrlBase}/works/me`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, httpOptions);
  }

  /** POST update Work **/
  updateWorks(id, data: Work): Observable<Work> {
    const url = `${this.httpUrlBase}/works/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, httpOptions);
  }

  /** DELETE delete Work **/
  deleteWorks(id): Observable<Work> {
    const url = `${this.httpUrlBase}/works/${id}`;
    return this.http.delete(url, httpOptions);
  }

}