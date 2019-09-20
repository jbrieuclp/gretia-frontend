import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject, Subscriber, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, filter } from 'rxjs/operators'
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Personne } from '../../../repository/person.repository';
import { TRAVAIL_OPTIONS, Travail, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';

import * as moment from 'moment';

@Component({
  selector: 'app-projet-my-s-list',
  templateUrl: './my-s-list.component.html',
  styleUrls: ['./my-s-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MySListComponent implements OnInit  {

  constructor(
  	private suiveuseS: SuiveuseService,
  	private suiveuseR: SuiveuseRepository,
  	private http: HttpClient
  ) {
  }

  user: BehaviorSubject<Personne>;
  userObservable: any;
  displayedColumns: string[] = ['date', 'duree', 'nb_mission'];
  data: Travail[] = [];
  travauxDataBase : SuiveuseRepository | null;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  	this.user = this.suiveuseS.user;
  	this.userObservable = this.user.asObservable()
													  				.pipe(filter(user=>user !== null))
													  				.subscribe(user=> { 
													  					this.getSynthese({startAt: this.getLastMonth()}); 
													  				});
  }

  getSynthese(options) {

  	this.travauxDataBase = new SuiveuseRepository(this.http);

  	this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  	merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.travauxDataBase!.getSynthese(this.user.value.id, options);
          /*return this.suiveuseR.getTravaux(this.user.value.id, 
            this.sort.active, this.sort.direction, this.paginator.pageIndex);*/
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError((e) => {
        	console.log(e);
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);

    
  }

  /*getTravaux(options: TRAVAIL_OPTIONS) {
  	this.suiveuseR.getTravaux(this.user.value.id, options).subscribe(travaux=> console.log(travaux))
  }*/

  getLastMonth() {
  	return moment(new Date().setMonth(new Date().getMonth()-1)).format('YYYY-MM-DD');
  }

  ngOnDestroy() {
  	this.userObservable.unsubscribe();
  	this.suiveuseS.clearUser();
  }

}
