import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { AppConfig } from '../../../shared/app.config';
import { Personne, Travailleur } from './person.repository';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Projet {
  id?: number,
  libelle?: string,
  localisation?: string,
  partenairesFinanciers?: any,
  partenairesTechniques?: any,
  type?: any,
  objet?: any,
  milieux?: any,
  groupes?: any,
  nbJour?: any,
  cout?: any,
  coutTotal?: any,
  responsable?: any,
  dateDebut?: any,
  dateFin?: any,
  dateRendu?: any,
  etat?: any,
  travailleurs?: any,
  dateCreate?: any,
  compteCreate?: any,
  dateUpdate?: any,
  compteUpdate?: any
}

@Injectable()
export class ProjetRepository {

	httpUrlBase: string;
  // constructeur ...
  constructor(private http: HttpClient) {
    this.httpUrlBase = AppConfig.URL_PROJET;
  }

  /** GET personnes par ID (cd_nom) **/
  projets(limit?: number): Observable<Projet[]> {
  	const url = this.httpUrlBase + '/projets';
  	const options = {};
    return this.http
    	.get(url, options)
    	.pipe(
        map((res: Projet[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  get(id: number): Observable<Projet> {
    const url = this.httpUrlBase + '/projet/'+id;
    const options = {};
    return this.http
      .get(url, options)
      .pipe(
        map((res: Projet) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  post(data: Projet): Observable<Projet> {
    const url = this.httpUrlBase + '/projet';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options)
      .pipe(
        map((res: Projet) => { 
          return res;
        })
       );
  }

  /** PUT personnes par ID (cd_nom) **/
  put(init: Projet, update: Projet): Observable<Projet> {
    const url = this.httpUrlBase + '/projet/'+init.id;
    const options = JSON.stringify(update);
    return this.http
      .put(url, options)
      .pipe(
        map((res: Projet) => { 
          return res;
        })
       );
  }

  /** DELETE personnes par ID (cd_nom) **/
  delete(projet: Projet): Observable<Boolean> {
    const url = this.httpUrlBase + '/projet/'+projet.id;
    const options = {};
    return this.http
      .delete(url, options)
      .pipe( 
        map((res: Boolean) => { 
          return res;
        })
        , retry(3)/*, catchError(this.handleError('deleteHero'))*/ );
  }

  /** POST personnes par ID (cd_nom) **/
  postTravailleur(travailleur: Travailleur): Observable<Personne[]> {
    const url = this.httpUrlBase + '/projet/'+travailleur.projet.id+'/travailleur';
    const options = JSON.stringify(travailleur);
    return this.http
      .post(url, options)
      .pipe(
        map((res: Personne[]) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  putTravailleur(travailleur: Travailleur): Observable<Personne[]> {
    const url = this.httpUrlBase + '/projet/'+travailleur.projet.id+'/travailleur/'+travailleur.personne.id;
    const options = JSON.stringify(travailleur);
    return this.http
      .put(url, options)
      .pipe(
        map((res: Personne[]) => { 
          return res;
        })
        , retry(3)
       );
  }

}