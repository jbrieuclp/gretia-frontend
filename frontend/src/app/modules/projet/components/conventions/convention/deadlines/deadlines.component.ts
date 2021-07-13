import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';

import { ConventionsRepository, Convention, Deadline } from '../../../../repository/conventions.repository';
import { ConventionService } from '../convention.service';

@Component({
  selector: 'app-project-convention-deadlines',
  templateUrl: './deadlines.component.html',
  styles: ['table .mat-icon-button { height: 24px; line-height: 24px; }']
})
export class DeadlinesComponent implements OnInit, OnDestroy {

	public totalItems: number = 0;
	private _deadlines: Deadline[] = [];
  set deadlines(values: Deadline[]) { this._deadlines = values; };
  get deadlines(): Deadline[] { return this._deadlines.filter(v => v !== null); };
	public loadingList: boolean = false;

  public _subscriptions: Subscription[] = [];

  constructor(
  	private conventionR: ConventionsRepository,
  	private conventionS: ConventionService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(
    	this.conventionS.convention.asObservable()
    		.pipe(
    			filter((convention: Convention) => convention !== null),
    			switchMap((convention: Convention): Observable<Deadline[]> => this.getDeadlines(convention.id)),
    		)
    		.subscribe((deadlines: Deadline[]) => this.deadlines = deadlines)
    );
  }

  getDeadlines(convention_id): Observable<Deadline[]> {
  	this.loadingList = true;
  	return this.conventionR.conventionDeadlines(convention_id)
  		.pipe(
  			tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Deadline[] => data["hydra:member"]),
        tap(() => this.loadingList = false),
  		);
  }

  deadlineChange([id, deadline]) {
    const index = this._deadlines.findIndex(f => f['@id'] === id);
    this._deadlines[index] = deadline;
  }

  deadlineCreate(deadline) {
    this._deadlines.push(deadline);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => { s.unsubscribe(); });
  }

}
