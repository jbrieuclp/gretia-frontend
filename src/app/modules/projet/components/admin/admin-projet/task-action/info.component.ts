import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { Action } from '../../../../repository/task.repository';
import { TaskActionService } from './task-action.service';

@Component({
  selector: 'app-projet-admin-task-action-info',
  templateUrl: './info.component.html',
  styleUrls: ['../../../css/info.scss']
})
export class TaskActionInfoComponent implements OnInit {

  public action: Action;

  constructor(
  	public dialog: MatDialog,
  	private taskActionS: TaskActionService,
  	private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.taskActionS.actionSelect.asObservable()
  		.subscribe(action=>this.action = action);
  }

  edit(action: Action) {
    this.taskActionS.actionSelect.next(action);
    this.taskActionS.moveStepper(1);
  }

  delete(action: Action) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de l'action "${action.libelle}" ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.taskActionS.delete(action);
      }
    }); 
  }
}
