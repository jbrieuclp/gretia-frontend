import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import { ProjetRepository, Charge } from '../../../../repository/projet.repository';
import { Task } from '../../../../repository/task.repository';
import { ProjetService } from '../projet.service';


@Injectable()
export class ProjetTasksService {

  public tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public loading: boolean = false; //chargement du projet

  constructor(
    private projetR: ProjetRepository,
    private projetS: ProjetService,
  ) { 
  	this.setObservables();
  }

  getTasks(project_id): Observable<Task[]> {
    this.loading = true;
    return this.projetR.tasksProject(project_id)
      .pipe(
        tap(() => this.loading = false),
        map((data: any): Charge[]=>data["hydra:member"]),
        catchError(err => {
            console.log('caught mapping error and rethrowing', err);
            return throwError(err);
        })
      )
  }

  refresh() {
    this.getTasks(this.projetS.project_id.getValue())
      .subscribe((tasks: Task[]) => this.tasks.next(tasks));
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //recuperation des info du projet à partir de l'ID de l'URL
    this.projetS.project_id.asObservable()
      .pipe(
        switchMap((id: number) => this.getTasks(id))
      )
      .subscribe((tasks: Task[]) => this.tasks.next(tasks));
  }

}
