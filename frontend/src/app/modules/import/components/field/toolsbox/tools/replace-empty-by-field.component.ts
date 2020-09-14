import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../../services/import.service';
import { FieldService } from '../../field.service';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-import-tools-replace-empty-by-field',
  templateUrl: './replace-empty-by-field.component.html',
  styleUrls: ['./replace-empty-by-field.component.scss'],
  providers: [FileService]
})
export class ReplaceEmptyByFieldComponent implements OnInit, OnDestroy {

	replaceForm: FormControl;
	field: any;
  fieldList: any[] = [];

  constructor(
  	private importS: ImportService,
    private fieldS: FieldService,
    private fileS: FileService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.fieldS.field.subscribe(field=>this.field = field);

  	// this.fileS.mappedFields.subscribe(fields => {
   //    this.fieldList = fields;
   //  });

    this.replaceForm = new FormControl('', {
      validators: Validators.required
    });
  }

  ngOnDestroy() {
    this.replaceForm.reset();
  }

  replace() {
  	if (this.replaceForm.valid) {
  		this.importS.regexpReplaceFieldElement(this.field.id, this.replaceForm.value)
  									.subscribe(result => {
  										//retour de la liste des valeurs mise à jour
  										this.fieldS.values.next(result);
  										this._snackBar.open('Liste des valeurs mise à jour', 'Fermer', {
									      duration: 4000,
									      verticalPosition: 'top'
									    });
  									},
										error => { 
											this._snackBar.open('Une erreur est survenue', 'Fermer', {
									      duration: 4000,
									      verticalPosition: 'top'
									    }); 
  									});
  	}
  }
}
