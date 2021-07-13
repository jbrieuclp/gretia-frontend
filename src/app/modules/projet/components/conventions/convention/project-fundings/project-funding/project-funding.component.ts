import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from "rxjs";
import { tap, map } from "rxjs/operators";

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Convention, ProjectFunding } from '../../../../../repository/conventions.repository';
import { ProjectFundingService } from './project-funding.service';
import { ConfirmationDialogComponent } from '../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: '[app-project-project-funding-tr]',
  templateUrl: './project-funding.component.html',
  providers: [ProjectFundingService]
})
export class ProjectFundingComponent implements OnInit {

	@Input() projectFunding: ProjectFunding;
	@Output() projectFundingChange = new EventEmitter<[string, ProjectFunding]>();
	public form: FormGroup;
	get displayForm(): boolean { return this.projectFundingS.displayForm; }
	get waiting(): boolean { return this.projectFundingS.waiting; }

  constructor(
  	private projectFundingS: ProjectFundingService,
  	private conventionR: ConventionsRepository,
  	private globalsS: GlobalsService,
  	public dialog: MatDialog,
  ) {
  	// this.projectS.project = this._project;
  }

  ngOnInit() {
  	this.form = this.projectFundingS.form;
  	this.form.patchValue(this.projectFunding)
  }

  save() {
  	this.projectFundingS.submit(this.projectFunding)
  		.subscribe((project: ProjectFunding) => {
  			this.projectFundingChange.emit([this.projectFunding['@id'], project]);
  			this.projectFunding = project; 
  		});
  }

  edit() {
  	this.projectFundingS.displayForm = true;
  }

  cancel() {
  	this.form.patchValue(this.projectFunding);
  	this.projectFundingS.displayForm = false;
  }

  delete() {
  	const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Confirmer la suppression de cette ligne ?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      	this.conventionR.delete(this.projectFunding['@id'])
		      .pipe(
		        tap(() => this.projectFundingChange.emit([this.projectFunding['@id'], null])),
		        tap(() => this.globalsS.snackBar({msg: "Suppression effectuée"}))
		      )
		      .subscribe(() => this.projectFunding = null);
        //this.projectS.delete(this.project['@id']);
      }
    });
  }

}
