import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/fr'  // without this line it didn't work

import { ProjetRepository, Projet } from '../../repository/projet.repository';
import { Week } from '../../repository/task.repository';
import { WeeksService } from '../projets/projet/tasks/task/weeks/weeks.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class ProjetAccueilComponent implements OnInit, OnDestroy {

	projets: Projet[] = [];
  year: number = moment().year();

  _subscriptions: Subscription[] = []

  constructor(
    private projetR: ProjetRepository,
    private weeksS: WeeksService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(
    	this.projetR.myProjets()
    		.pipe(
    			map((res): Projet[] => Object.values(res['hydra:member']))
    		)
        .subscribe((projets: Projet[])=>this.projets = projets)
    );

    this._subscriptions.push(
      this.weeksS.week.asObservable()
        .pipe(
          filter((week: Week) => week !== null)
        )
        .subscribe((week: Week)=> console.log(week))
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  tasksDay(projet) {
    let days = 0;
    projet.tasks.forEach(t => { days += t.nbJours; });
    return days;
  }

  tasksDayDone(projet) {
    let days = 0;
    projet.tasks.forEach(t => { days += t.numberDaysDone; });
    return days;
  }

  getWeekTooltip(week) {
    // let tooltip: {projet: {'@id': string, label: string, tasks: string[]}}[] = [];

    // let projet = this.projets.filter(projet => 
    //               projet.tasks.filter(task => 
    //                 task.periods.findIndex(period => period['@id'] === week['@id']) !== -1
    //               )
    //             )
    // this.projets.forEach(projet => {
    //   projet.tasks.forEach(task => { 
    //     if (task.periods.findIndex(p => p['@id'] === week['@id']) !== -1) {
    //       if


    //       tooltip.push({week: week, data: []});
    //     }
    //   });
    // })
    // return data;
  }

  /**
   * Retourne un tableau des observateurs (prenom nom)
   * Sert aussi à la mise en forme du tooltip
   */
  displayObservateursTooltip(row): string[] {
    let tooltip = [];
    if (row.observers === undefined) {
      if (row.observers_txt !== null && row.observers_txt.trim() !== "") {
        tooltip.push(row.observers_txt.trim());
      } else {
        tooltip.push("Aucun observateurs");
      }
    } else {
      for (let i = 0; i < row.observers.length; i++) {
        let obs = row.observers[i];
        tooltip.push([obs.prenom_role, obs.nom_role].join(" "));
      }
    }

    return tooltip.sort();
  }

}
