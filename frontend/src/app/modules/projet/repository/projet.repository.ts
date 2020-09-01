import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Mission } from './mission.repository';


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
  compteUpdate?: any,
  missions?: Mission[]
}

export interface Organisme {
  id?: number,
  nom?: string,
  sigle?: string,
  projetsFinances?: any,
  projetsTechniques?: any
}

export interface ProjetTravailleur {
  projet?: Projet,
  personne?: Personne,
  temps?: number
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
    return this.http
    	.get(url, httpOptions)
    	.pipe(
        map((res: Projet[]) => { 
          return res;
        })
        , retry(3)
	   	);
  }

  /** GET personnes par ID (cd_nom) **/
  getProjet(id: number): Observable<Projet> {
    const url = this.httpUrlBase + '/projet/'+id;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((res: Projet) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST personnes par ID (cd_nom) **/
  postProjet(data: any): Observable<Projet> {
    const url = this.httpUrlBase + '/projets';
    const sources = JSON.stringify(data);
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        map((projet: Projet) => { 
          return projet;
        })
       );
  }

  /** PUT personnes par ID (cd_nom) **/
  putProjet(projet: Projet, data: any): Observable<Projet> {
    const url = this.httpUrlBase + '/projet/'+projet.id;
    const sources = JSON.stringify(data);
    return this.http
      .put(url, sources, httpOptions)
      .pipe(
        map((projet: Projet) => { 
          return projet;
        })
       );
  }

  /** DELETE personnes par ID (cd_nom) **/
  deleteProjet(projet: Projet): Observable<Boolean> {
    const url = this.httpUrlBase + '/projet/'+projet.id;
    return this.http
      .delete(url, httpOptions)
      .pipe( 
        map((res: Boolean) => { 
          return res;
        })
        , retry(3)/*, catchError(this.handleError('deleteHero'))*/ );
  }

  /** GET travailleurs par ID  **/
  getTravailleurs(projet_id: number): Observable<ProjetTravailleur[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/travailleurs';
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((travailleurs: ProjetTravailleur[]) => travailleurs)
        , retry(3)
       );
  }

  /** POST travailleur par ID  **/
  postTravailleurs(projet_id: number, data: any): Observable<ProjetTravailleur[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/travailleurs';
    const options = JSON.stringify(data);
    return this.http
      .post(url, options, httpOptions)
      .pipe(
        map((travailleurs: ProjetTravailleur[]) => travailleurs)
        , retry(3)
       );
  }

  /** PUT travailleur par ID  **/
  putTravailleur(projet_id: number, trav_init_id: number, data: any): Observable<ProjetTravailleur[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/travailleur/'+trav_init_id;
    const options = JSON.stringify(data);
    return this.http
      .put(url, options, httpOptions)
      .pipe(
        map((travailleurs: ProjetTravailleur[]) => travailleurs)
        , retry(3)
       );
  }

  /** DELETE travailleur par ID  **/
  removeTravailleur(projet: Projet, travailleur: ProjetTravailleur): Observable<ProjetTravailleur[]> {
    const url = this.httpUrlBase + '/projet/'+projet.id+'/travailleur/'+travailleur.personne.id;
    return this.http
      .delete(url, httpOptions)
      .pipe(
        map((travailleurs: ProjetTravailleur[]) => travailleurs)
        , retry(3)
       );
  }


  /****************************/ 
  /** Organismes partenaires **/
  /****************************/ 

  /** GET partenaires financiers projet ID **/
  getPartFinanciers(projet_id: number): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/partenaires-financiers';
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((res: Organisme[]) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST partenaires financiers projet ID **/
  addPartFinanciers(projet_id: number, organisme_id: number): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/partenaires-financiers/'+organisme_id;
    return this.http
      .post(url, {}, httpOptions)
      .pipe(
        map((res: Organisme[]) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** DELETE partenaires financiers projet ID  **/
  removePartFinancier(projet: Projet, organisme: Organisme): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet.id+'/partenaire-financier/'+organisme.id;
    return this.http
      .delete(url, httpOptions)
      .pipe(
        map((organismes: Organisme[]) => organismes)
        , retry(3)
       );
  }

  /** GET partenaires financiers projet ID **/
  getPartTechniques(projet_id: number): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/partenaires-techniques';
    return this.http
      .get(url, httpOptions)
      .pipe(
        map((res: Organisme[]) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** POST partenaires techniques projet ID **/
  addPartTechniques(projet_id: number, organisme_id: number): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet_id+'/partenaires-techniques/'+organisme_id;
    return this.http
      .post(url, {}, httpOptions)
      .pipe(
        map((res: Organisme[]) => { 
          return res;
        })
        , retry(3)
       );
  }

  /** DELETE partenaires financiers projet ID  **/
  removePartTechnique(projet: Projet, organisme: Organisme): Observable<Organisme[]> {
    const url = this.httpUrlBase + '/projet/'+projet.id+'/partenaire-technique/'+organisme.id;
    return this.http
      .delete(url, httpOptions)
      .pipe(
        map((organismes: Organisme[]) => organismes)
        , retry(3)
       );
  }

}