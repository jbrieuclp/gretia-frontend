import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, startWith, tap, mergeMap } from 'rxjs/operators';

import { TaskRepository, Avancement } from '../../repository/task.repository';

@Component({
  selector: 'app-projet-control-task-avancement',
  templateUrl: './task-avancement-control.component.html',
  styleUrls: ['./task-avancement-control.component.scss']
})
export class TaskAvancementControlComponent implements OnInit {

	@Input() form: FormControl = new FormControl();
  avancements: Avancement[] = [];

  constructor(
  	private taskR: TaskRepository
  ) { }

  ngOnInit() {
  	this.taskR.avancements()
  		.pipe(
        map((data: any): Avancement[]=>data["hydra:member"]),
        map((avancements: Avancement[])=>avancements.sort((a, b)=> a.ordre - b.ordre))
      )
  		.subscribe((avancements: Avancement[])=>this.avancements = avancements);
  }
}
