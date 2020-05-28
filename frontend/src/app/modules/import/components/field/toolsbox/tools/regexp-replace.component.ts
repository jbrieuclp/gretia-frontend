import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../../services/import.service';
import { FieldService } from '../../field.service';

@Component({
  selector: 'app-import-tools-regexp-replace',
  templateUrl: './regexp-replace.component.html',
  styleUrls: ['./regexp-replace.component.scss']
})
export class RegexpReplaceComponent implements OnInit, OnDestroy {

	searchReplaceForm: FormGroup;
	field: any;

  constructor(
  	private fb: FormBuilder,
  	private importS: ImportService,
    private fieldS: FieldService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.fieldS.field.subscribe(field=>this.field = field);
  	this.searchReplaceForm = this.fb.group({
        'search': ['', [Validators.required]],
        'replace': ['', []]
    });
  }

  ngOnDestroy() {
    this.searchReplaceForm.reset();
  }

  searchReplace() {
  	if (this.searchReplaceForm.valid) {
  		this.importS.regexpReplaceFieldElement(this.field.id, this.searchReplaceForm.value)
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
