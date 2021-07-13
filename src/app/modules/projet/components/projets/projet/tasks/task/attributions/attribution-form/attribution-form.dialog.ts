import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";

import { Task, TaskAttribution, TaskRepository } from '../../../../../../../repository/task.repository';
import { ProjetRepository } from '../../../../../../../repository/projet.repository';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-projets-tasks-task-attribution-form',
  templateUrl: './attribution-form.dialog.html',
  styleUrls: ['./attribution-form.dialog.scss']
})
export class TaskAttributionFormDialog implements OnInit {

	attribution: TaskAttribution;
	form: FormGroup;
	waiting: boolean = false;

	@Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<TaskAttributionFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  	private taskR: TaskRepository,
    private taskS: TaskService,
  ) { 
    this.attribution = data.attribution
  }

  ngOnInit() {

  	this.initForm();

  	if (this.attribution['@id']) {
  		this.form.patchValue(this.attribution);
  	}
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      salarie: [null, Validators.required],
      nbJours: [null, [Validators.required, Validators.max(this.getMaxDay())]]
    });
  }

  submit(): void {   
    this.waiting = true;
    let api;

    if (this.attribution['@id']) {
      //update
      api = this.taskR.patch(
        this.attribution['@id'],
        Object.assign(this.attribution, this.form.value)
      )
        .pipe(
        	tap((attribution: TaskAttribution) => this.attribution = attribution)
      	)
    } else {
      // create
      api = this.taskR
        .addAttribution(Object.assign(this.attribution, this.form.value));
    }

    api
    	.pipe(
        tap((): void => {
          this.waiting = false;
          this.form.reset();
        }),
      )
      .subscribe(
        () => this.dialogRef.close(true),
        (err) => this.waiting = false
      );
  }

  getMaxDay(): number {
    let max = (this.taskS.task.getValue()).nbJours;

    (this.taskS.task.getValue()).attributions.forEach(e => {
      if (this.attribution['@id'] !== e['@id']) {
        max -= e.nbJours;
      }
    });

    return max;
  }

  cancel() {
    this.form.reset(); 
    this.dialogRef.close(false);
  }

}
