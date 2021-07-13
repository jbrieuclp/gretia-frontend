import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import { ProjetRepository } from '../../../../repository/projet.repository';
import { ProjectFunding } from '../../../../repository/conventions.repository';
import { ProjetService } from '../projet.service';


@Injectable()
export class ProjetFinancementService {

  public fundings: ProjectFunding[] = [];
  public loading: boolean = false; //chargement du projet

  constructor(
    private projetR: ProjetRepository,
    private projetS: ProjetService,
  ) { 
  	this.setObservables();
  }

  getFundings(project_id): Observable<ProjectFunding[]> {
    this.loading = true;
    return this.projetR.fundings(project_id)
      .pipe(
        tap(() => this.loading = false),
        map((data: any): ProjectFunding[]=>data["hydra:member"]),
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
        switchMap((id: number) => this.getFundings(id))
      )
      .subscribe((fundings: ProjectFunding[]) => this.fundings = fundings);
  }

}
