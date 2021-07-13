import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { TaskActionService } from './task-action.service';

@Component({
  selector: 'app-projet-projet-task-action-form',
  templateUrl: './task-action-form.component.html'
})
export class TaskActionFormComponent implements OnInit {
	
	public form: FormGroup;

	get localisation() {
		return this.taskActionS.actionSelect.getValue();
	}

  constructor(
  	private taskActionS: TaskActionService
  ) { }

  ngOnInit() {
  	this.form = this.taskActionS.form;
  }

  save() {
  	this.taskActionS.submit();
  }

  cancel() {
    this.taskActionS.reset();
    this.taskActionS.moveStepper(0);
  }
}
