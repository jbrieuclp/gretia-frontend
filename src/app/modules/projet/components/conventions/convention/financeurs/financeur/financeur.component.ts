import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from "rxjs";
import { tap, map } from "rxjs/operators";

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Financeur } from '../../../../../repository/conventions.repository'
import { FinanceurService } from './financeur.service';
import { ConfirmationDialogComponent } from '../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: '[app-project-financeur-tr]',
  templateUrl: './financeur.component.html',
  providers: [FinanceurService]
})
export class FinanceurComponent implements OnInit {

	@Input() financeur: Financeur;
	@Output() financeurChange = new EventEmitter<[string, Financeur]>();
	public form: FormGroup;
	get displayForm(): boolean { return this.financeurS.displayForm; }
	get waiting(): boolean { return this.financeurS.waiting; }

  constructor(
  	private financeurS: FinanceurService,
  	private conventionR: ConventionsRepository,
  	private globalsS: GlobalsService,
  	public dialog: MatDialog,
  ) {
  	// this.financeurS.financeur = this._financeur;
  }

  ngOnInit() {
  	this.form = this.financeurS.form;
  	this.form.patchValue(this.financeur)
  }

  save() {
  	this.financeurS.submit(this.financeur)
  		.subscribe((financeur: Financeur) => {
  			this.financeurChange.emit([this.financeur['@id'], financeur]);
  			this.financeur = financeur; 
  		});
  }

  edit() {
  	this.financeurS.displayForm = true;
  }

  cancel() {
  	this.form.patchValue(this.financeur);
  	this.financeurS.displayForm = false;
  }

  delete() {
  	const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de cette ligne ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      	this.conventionR.delete(this.financeur['@id'])
		      .pipe(
		        tap(() => this.financeurChange.emit([this.financeur['@id'], null])),
		        tap(() => this.globalsS.snackBar({msg: "Suppression effectuée"}))
		      )
		      .subscribe(() => this.financeur = null);
        //this.financeurS.delete(this.financeur['@id']);
      }
    });
  }

}
