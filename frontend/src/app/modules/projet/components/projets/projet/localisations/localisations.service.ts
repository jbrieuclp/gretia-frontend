import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import { ProjetRepository, Localisation } from '../../../../repository/projet.repository';
import { ProjetService } from '../projet.service';


@Injectable()
export class ProjectLocalisationsService {

  public localisations: Localisation[] = [];
  public loading: boolean = false; //chargement du projet
  public totalItems: number = 0; //chargement du projet

  constructor(
    private projetR: ProjetRepository,
    private projetS: ProjetService,
  ) { 
  	this.setObservables();
  }

  getLocalisations(project_id): Observable<Localisation[]> {
    this.loading = true;
    return this.projetR.project_localisations(project_id)
      .pipe(
        tap(() => this.loading = false),
        catchError(err => {
            console.log('caught mapping error and rethrowing', err);
            return throwError(err);
        })
      )
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //recuperation des info du projet à partir de l'ID de l'URL
    this.projetS.project_id.asObservable()
      .pipe(
        switchMap((id: number) => this.getLocalisations(id)),
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Localisation[]=>data["hydra:member"]),
      )
      .subscribe((localisations: Localisation[]) => this.localisations = localisations);
  }

}
