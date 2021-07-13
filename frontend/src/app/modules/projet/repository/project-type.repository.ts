import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AppConfig } from '../../../shared/app.config';
import { HTTP_OPTIONS, ApiProjectRepository } from './api-project.repository';

export interface RefProjectType {
  id?: number,
  libelle?: string,
  description?: string,
  ordre?: number,
  projectTypes?: ProjectType[]
};

export interface ProjectType {
  id?: number,
  refProjectType?: RefProjectType,
  applicationDebut?: string,
  applicationFin?: string,
  coutJour?: number[]
};

@Injectable()
export class ProjectTypeRepository extends ApiProjectRepository {


  ///////////////////////
  //  TYPE PROJET REF  //
  ///////////////////////
  /** GET list of RefProjectType **/
  refProjectTypes(params = {}): Observable<RefProjectType[]> {
    const url = `${this.httpUrlBase}/ref_project_types`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: RefProjectType[]) => res), 
        retry(3)
      );
  }

  /** GET list of RefProjectType **/
  refProjectType(id): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/ref_project_types/${id}`;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: RefProjectType) => res), 
        retry(3)
      );
  }

  /** POST create new RefProjectType **/
  createRefProjectType(data: RefProjectType): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/ref_project_types`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** POST update RefProjectType **/
  updateRefProjectType(id, data: RefProjectType): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/ref_project_types/${id}`;
    const sources = JSON.stringify(data);
    return this.http.patch(url, sources, HTTP_OPTIONS);
  }

  /** DELETE delete RefProjectType **/
  deleteRefProjectType(id): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/ref_project_types/${id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }

  ///////////////////////
  //  TYPE PROJET  //
  ///////////////////////
  /** GET list of ProjectType **/
  projectTypes(params): Observable<ProjectType[]> {
    const url = `${this.httpUrlBase}/project_types`;
    const options = {params: params};
    return this.http
      .get(url, options)
      .pipe(
        map((res: ProjectType[]) => res), 
        retry(3)
      );
  }

  /** POST add Salarie to Personne **/
  createProjectType(data: ProjectType): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/project_types`;
    const sources = JSON.stringify(data);
    return this.http.post(url, sources, HTTP_OPTIONS);
  }

  /** DELETE remove Salarie to Personne **/
  deleteProjectType(id): Observable<RefProjectType> {
    const url = `${this.httpUrlBase}/project_types/${id}`;
    return this.http.delete(url, HTTP_OPTIONS);
  }
  
}