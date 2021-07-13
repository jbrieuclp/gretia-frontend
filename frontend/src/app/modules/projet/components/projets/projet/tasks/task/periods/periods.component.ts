import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, map, switchMap, skip } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/fr'  // without this line it didn't work

import { Task, Week, TaskRepository } from '../../../../../../repository/task.repository';

moment.locale('fr');

@Component({
  selector: 'app-projects-tasks-task-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class TaskPeriodsComponent implements OnInit {

	@Input() task: Task;
	periodsValue: Week[] = [];
	totalItems: number = 0;
	editionMode: boolean = false;
	periods_ids: BehaviorSubject<string[]>;
	_subscription: Subscription;

	_years: number[] = [];
	get years() {
		return this._years.sort((a, b) => a - b);
	}

	private _viewYear: number
	get viewYear(): number {
		if (this._viewYear !== undefined) {
			return this._viewYear;
		} else {
			return this._years.length ? this._years[0] : moment().year();
		}
	}
	set viewYear(year) {
		this._viewYear = year;
	}

  constructor(
  	private taskR: TaskRepository,
  ) { }

  ngOnInit() {
  	this.periods_ids = new BehaviorSubject(<string[]> this.task.periods);

  	this.getPeriods();

  	this._subscription = this.periods_ids.asObservable()
  		.pipe(
  			skip(1),
  			switchMap((periods) => this.taskR.patch(this.task['@id'], {periods: this.task.periods})),
  			tap((task) => this.task = task)
  		)
  		.subscribe((res) => this.getPeriods());
  }

  getPeriods() {
  	this.taskR.periods(this.task.id)
  		.pipe(
  			tap(() => this._years = []),
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Week[]=>data["hydra:member"]),
        tap((periods: Week[]) => {
        	periods.forEach(p => {
        		this._years[Math.abs(moment().diff(moment([p.year]), 'year'))] = p.year;
        	})
        	this._years = this._years.filter(v => v !== undefined);
        }),
      )
  		.subscribe((periods: Week[]) => this.periodsValue = periods);
  }

  submit([checked, week]: [boolean, Week]): void {
  	let periods = this.periods_ids.getValue();
  	if (checked) {
  		periods.push(week['@id']);
  	} else {
  		const idx = this.task.periods.findIndex(e => e == week['@id']);
  		periods.splice(idx, 1);
  	}
  	this.periods_ids.next(periods);
  }

}
