import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, startWith, tap, mergeMap } from 'rxjs/operators';

import { TaskRepository, Action } from '../../repository/task.repository';

@Component({
  selector: 'app-projet-control-task-action',
  templateUrl: './task-action-control.component.html',
  styleUrls: ['./task-action-control.component.scss']
})
export class TaskActionControlComponent implements OnInit {

	@Input() form: FormControl = new FormControl();
  actions: Action[] = [];

  constructor(
  	private taskR: TaskRepository
  ) { }

  ngOnInit() {
  	this.taskR.actions()
  		.pipe(
        map((data: any): Action[]=>data["hydra:member"]),
        map((actions: Action[])=>actions.sort((a, b)=> a.ordre - b.ordre))
      )
  		.subscribe((actions: Action[])=>this.actions = actions);
  }
}
