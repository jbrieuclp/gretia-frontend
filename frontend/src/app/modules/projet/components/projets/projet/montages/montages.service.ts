import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import { ProjetRepository, Charge } from '../../../../repository/projet.repository';
import { ProjetService } from '../projet.service';


@Injectable()
export class ProjetMontagesService {

  public charges: BehaviorSubject<Charge[]> = new BehaviorSubject([]);
  public loading: boolean = false; //chargement du projet
  public totalItems: number = 0; //chargement du projet

  constructor(
    private projetR: ProjetRepository,
    private projetS: ProjetService,
  ) { 
  	this.setObservables();
  }

  getCharges(project_id): Observable<Charge[]> {
    this.loading = true;
    return this.projetR.chargesProject(project_id)
      .pipe(
        tap(() => this.loading = false),
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Charge[]=>data["hydra:member"]),
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
        switchMap((id: number) => this.getCharges(id))
      )
      .subscribe((charges: Charge[]) => this.charges.next(charges));
  }

}
