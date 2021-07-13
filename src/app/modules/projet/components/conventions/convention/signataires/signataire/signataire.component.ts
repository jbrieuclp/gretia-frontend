import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from "rxjs";
import { tap, map } from "rxjs/operators";

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Signataire } from '../../../../../repository/conventions.repository'
import { SignataireService } from './signataire.service';
import { ConfirmationDialogComponent } from '../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: '[app-project-signataire-tr]',
  templateUrl: './signataire.component.html',
  providers: [SignataireService]
})
export class SignataireComponent implements OnInit {

	@Input() signataire: Signataire;
	@Output() signataireChange = new EventEmitter<[string, Signataire]>();
	public form: FormGroup;
	get displayForm(): boolean { return this.signataireS.displayForm; }
	get waiting(): boolean { return this.signataireS.waiting; }

  constructor(
  	private signataireS: SignataireService,
  	private conventionR: ConventionsRepository,
  	private globalsS: GlobalsService,
  	public dialog: MatDialog,
  ) {
  	// this.signataireS.signataire = this._signataire;
  }

  ngOnInit() {
  	this.form = this.signataireS.form;
  	this.form.patchValue(this.signataire)
  }

  save() {
  	this.signataireS.submit(this.signataire)
  		.subscribe((signataire: Signataire) => {
  			this.signataireChange.emit([this.signataire['@id'], signataire]);
  			this.signataire = signataire; 
  		});
  }

  edit() {
  	this.signataireS.displayForm = true;
  }

  cancel() {
  	this.form.patchValue(this.signataire);
  	this.signataireS.displayForm = false;
  }

  delete() {
  	const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de cette ligne ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      	this.conventionR.delete(this.signataire['@id'])
		      .pipe(
		        tap(() => this.signataireChange.emit([this.signataire['@id'], null])),
		        tap(() => this.globalsS.snackBar({msg: "Suppression effectuée"}))
		      )
		      .subscribe(() => this.signataire = null);
        //this.signataireS.delete(this.signataire['@id']);
      }
    });
  }
}
