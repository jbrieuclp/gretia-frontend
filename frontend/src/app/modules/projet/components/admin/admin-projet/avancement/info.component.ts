import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { Action } from '../../../../repository/task.repository';
import { AvancementService } from './avancement.service';

@Component({
  selector: 'app-projet-admin-avancement-info',
  templateUrl: './info.component.html',
  styleUrls: ['../../../css/info.scss']
})
export class AvancementInfoComponent implements OnInit {

  public avancement: Action;

  constructor(
  	public dialog: MatDialog,
  	private avancementS: AvancementService,
  	private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.avancementS.avancementSelect.asObservable()
  		.subscribe(avancement=>this.avancement = avancement);
  }

  edit(avancement: Action) {
    this.avancementS.avancementSelect.next(avancement);
    this.avancementS.moveStepper(1);
  }

  delete(avancement: Action) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de l'avancement "${avancement.libelle}" ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.avancementS.delete(avancement);
      }
    }); 
  }
}
