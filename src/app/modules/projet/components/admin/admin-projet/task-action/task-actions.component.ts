import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Action } from '../../../../repository/task.repository';
import { TaskActionService } from './task-action.service';

@Component({
  selector: 'app-projet-admin-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['../../../css/list-display.scss']
})
export class TaskActionsComponent implements OnInit {

	get actions(): Action[] {
    return this.taskActionS.actions;
  }
  @ViewChild('stepper', { static: true }) private stepper: MatStepper;

  get action() {
    return this.taskActionS.actionSelect.getValue();
  }

  constructor(
  	private taskActionS: TaskActionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.taskActionS.stepper = this.stepper;
  }

  select(action: Action) {
    this.taskActionS.moveStepper(0);
    this.taskActionS.actionSelect.next(action);
  }

  addAction() {
    this.taskActionS.actionSelect.next(null);
    this.taskActionS.moveStepper(1);
  }
}
