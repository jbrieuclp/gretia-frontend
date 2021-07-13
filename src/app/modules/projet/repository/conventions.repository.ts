import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AppConfig } from '../../../shared/app.config';
import { HTTP_OPTIONS, ApiProjectRepository } from './api-project.repository';
import { Organisme } from './organisme.repository';
import { Projet } from './projet.repository';


export interface Convention {
  "@id"?: string;
  "@type"?: string;
  "id"?: number;
  "intitule"?: string;
  "description"?: string;
  "financeurs"?: Financeur[];
  "signataires"?: Signataire[];
  "deadlines"?: Deadline[];
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

export interface Financeur {
  "@id"?: string;
  "@type"?: string;
  "convention"?: any;
  "organisme"?: Organisme;
  "financement"?: number;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

export interface Signataire {
  "@id"?: string;
  "@type"?: string;
  "convention"?: Convention;
  "organisme"?: Organisme;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

export interface Deadline {
  "@id"?: string;
  "@type"?: string;
  "convention"?: Convention;
  "deadlineType"?: any;
  "date"?: Date;
  "comment"?: string;
  "isReported"?: boolean;
  "isObsolete"?: boolean;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

export interface DeadlineType {
  "@id"?: string;
  "@type"?: string;
  "label"?: string;
  "description"?: string;
  "order"?: number;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

export interface ProjectFunding {
  "@id"?: string;
  "@type"?: string;
  "project"?: any;
  "convention"?: Convention;
  "label"?: string;
  "eligibleFunding"?: number;
  "createdAt"?: Date;
  "createdBy"?: any;
  "updatedAt"?: Date;
  "updatedBy"?: any;
}

@Injectable()
export class ConventionsRepository extends ApiProjectRepository {


  ////////////////////
  //  CONVENTIONS  //
  ////////////////////
  /** GET list of Convention **/
  conventions(): Observable<Convention[]> {
    const url = `${this.httpUrlBase}/conventions`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Convention[]) => res), 
        retry(3)
      );
  }

  /** GET one of Convention **/
  convention(id): Observable<Convention> {
    const url = `${this.httpUrlBase}/conventions/${id}`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Convention) => res), 
        retry(3)
      );
  }

  /** GET one of Convention **/
  conventionFinanceurs(id): Observable<Financeur[]> {
    const url = `${this.httpUrlBase}/conventions/${id}/financeurs`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Financeur[]) => res), 
        retry(3)
      );
  }

  /** GET one of Convention **/
  conventionSignataires(id): Observable<Signataire[]> {
    const url = `${this.httpUrlBase}/conventions/${id}/signataires`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Signataire[]) => res), 
        retry(3)
      );
  }

  /** GET one of Convention **/
  conventionProjectFundings(id): Observable<Signataire[]> {
    const url = `${this.httpUrlBase}/conventions/${id}/project_fundings`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Signataire[]) => res), 
        retry(3)
      );
  }

  /** GET one of Convention **/
  conventionDeadlines(id): Observable<Signataire[]> {
    const url = `${this.httpUrlBase}/conventions/${id}/deadlines`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Signataire[]) => res), 
        retry(3)
      );
  }

  /** POST create new Convention **/
  postConventions(data: Convention): Observable<Convention> {
    const url = `${this.httpUrlBase}/conventions`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** POST update Convention **/
  updateConvention(id, data: Convention): Observable<Convention> {
    const url = `${this.httpUrlBase}/conventions/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete Convention **/
  deleteConvention(id): Observable<Convention> {
    const url = `${this.httpUrlBase}/conventions/${id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  ////////////////////
  //  FINANCEURS  //
  ////////////////////
  /** GET list of Convention **/
  financeurs(): Observable<Financeur[]> {
    const url = `${this.httpUrlBase}/financeurs`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Financeur[]) => res), 
        retry(3)
      );
  }

  /** POST create new Convention **/
  postFinanceurs(data: Financeur): Observable<Financeur> {
    const url = `${this.httpUrlBase}/financeurs`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete Convention **/
  deleteFinanceurs(c_id, f_id): Observable<Convention> {
    const url = `${this.httpUrlBase}/financeurs/convention=${c_id};organisme=${f_id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  ////////////////////
  //  SIGNATAIRES  //
  ////////////////////
  /** GET list of Convention **/
  signataires(): Observable<Signataire[]> {
    const url = `${this.httpUrlBase}/signataires`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Signataire[]) => res), 
        retry(3)
      );
  }

  /** POST create new Convention **/
  postSignataires(data: Signataire): Observable<Signataire> {
    const url = `${this.httpUrlBase}/signataires`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete Convention **/
  deleteSignataires(c_id, s_id): Observable<Convention> {
    const url = `${this.httpUrlBase}/signataires/convention=${c_id};organisme=${s_id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  ////////////////////
  //  DEADLINE  //
  ////////////////////
  /** GET list of Deadline **/
  deadlines(): Observable<Deadline[]> {
    const url = `${this.httpUrlBase}/convention_deadlines`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Deadline[]) => res), 
        retry(3)
      );
  }

  /** POST create new Deadline **/
  postDeadlines(data: Deadline): Observable<Deadline> {
    const url = `${this.httpUrlBase}/convention_deadlines`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete Deadline **/
  deleteDeadlines(c_id, dt_id): Observable<Convention> {
    const url = `${this.httpUrlBase}/convention_deadlines/convention=${c_id};deadline_types=${dt_id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  /** GET list of Deadline **/
  deadlineTypes(): Observable<DeadlineType[]> {
    const url = `${this.httpUrlBase}/deadline_types`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: DeadlineType[]) => res), 
        retry(3)
      );
  }

  ///////////////////////
  //  PROJECT FUNDING  //
  ///////////////////////
  /** POST create new ProjectFunding **/
  postProjectFunding(data: ProjectFunding): Observable<ProjectFunding> {
    const url = `${this.httpUrlBase}/project_fundings`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** POST update ProjectFunding **/
  patchProjectFunding(id, data: ProjectFunding): Observable<ProjectFunding> {
    const url = `${this.httpUrlBase}/project_fundings/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete ProjectFunding **/
  deleteProjectFunding(p_id, c_id): Observable<ProjectFunding> {
    const url = `${this.httpUrlBase}/project_fundings/${p_id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

}