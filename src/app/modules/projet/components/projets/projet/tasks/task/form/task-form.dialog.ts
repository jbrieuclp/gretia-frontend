import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';

import { TaskFormService } from './task-form.service';
import { ProjetService } from '../../../projet.service';
import { ProjetMontagesService } from '../../../montages/montages.service';
import { TaskService } from '../task.service';
import { Projet, Charge } from '../../../../../../repository/projet.repository';

@Component({
  selector: 'app-projet-task-form',
  templateUrl: './task-form.dialog.html',
  styleUrls: ['./task-form.dialog.scss']
})
export class TaskFormDialog implements OnInit {

	form: FormGroup;

	get task() {
		return this.taskS.task.getValue();
	}
  get charges(): Charge[] {
    return this.projetMontagesS.charges.getValue();
  }

  get associatedCharges(): Charge[] {
    return this.charges.filter(c => c.chargeType.chargeTypeRef.isPerDay === true);
  }

  constructor(
    public dialogRef: MatDialogRef<TaskFormDialog>,
  	private taskFormS: TaskFormService,
    private projetS: ProjetService,
    private projetMontagesS: ProjetMontagesService,
    private taskS: TaskService,
  ) { }

  ngOnInit() {
  	this.form = this.taskFormS.form;
  }

  save() {
    this.taskFormS.submit();
    this.dialogRef.close(true);
  }

  cancel() {
    this.form.reset(); 
    this.dialogRef.close(false);
  }


  getAvailableDay(charge): number {
    charge = this.charges.find(c => c['@id'] == charge);
    if (this.associatedCharges.length && charge !== undefined) {
      let availableDay = charge.quantity;
      this.taskFormS.projet.tasks.filter(t => t.charge !== null).forEach((task, i) => {
        if (task.charge['@id'] == charge['@id']) {
          if (task['@id'] == this.taskS.task.getValue()['@id']) {
            availableDay = availableDay - this.form.get('nbJours').value;
          } else {
            availableDay = availableDay - task.nbJours;
          }
        }
      })
      return availableDay;
    }
  }
}
