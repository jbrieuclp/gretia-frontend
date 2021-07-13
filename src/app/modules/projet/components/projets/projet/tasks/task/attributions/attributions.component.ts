import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { tap, map, filter, switchMap } from 'rxjs/operators';

import { Task, TaskAttribution, TaskRepository } from '../../../../../../repository/task.repository';
import { TaskAttributionFormDialog } from './attribution-form/attribution-form.dialog';
import { ConfirmationDialogComponent } from '../../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-projets-tasks-task-attributions',
  templateUrl: './attributions.component.html',
  styleUrls: ['./attributions.component.scss']
})
export class TaskAttributionsComponent implements OnInit {

	@Input() task: Task;
	attributions: TaskAttribution[] = [];
	totalItems: number = 0;
  loading: boolean = false;

  constructor(
  	private taskR: TaskRepository,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  	this.getAttributions();
  }

  getAttributions() {
    this.loading = true;
  	this.taskR.attributions(this.task.id)
  		.pipe(
        tap(() => this.loading = false),
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): TaskAttribution[]=>data["hydra:member"])
      )
  		.subscribe((attributions: TaskAttribution[]) => this.attributions = attributions);
  }

  openTaskForm(attribution: TaskAttribution = null) {

    if (attribution === null) {
      attribution = {task: this.task};
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '750px';
    dialogConfig.position = {top: '70px'};
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      'attribution': attribution
    };

    const dialogRef = this.dialog.open(TaskAttributionFormDialog, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter((res: boolean) => res)
      )
      .subscribe((val) => {console.log(val);this.getAttributions()});
  }

  delete(attribution: TaskAttribution) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de l'attribution des heures pour "${attribution.salarie.personne.nom} ${attribution.salarie.personne.prenom}" ?`
    });
    dialogRef.afterClosed()
      .pipe(
        filter(close => close),
        switchMap(() => this.taskR.delete(attribution['@id'])),
      )
      .subscribe(() => this.getAttributions()); 
  }

}
