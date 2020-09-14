import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../../services/import.service';
import { FileDataService } from '../../../../services/file.service';

@Component({
  selector: 'app-import-tools-replace-empty-by-field',
  templateUrl: './replace-empty-by-field.component.html',
  styleUrls: ['./replace-empty-by-field.component.scss']
})
export class ReplaceEmptyByFieldComponent implements OnInit, OnDestroy {

	replaceForm: FormControl;
	field: any;
  fieldList: any[] = [];

  constructor(
  	private importS: ImportService,
    private fileDataS: FileDataService,
  ) { }

  ngOnInit() {
  	
    this.fieldList = this.fileDataS.fields.getValue();

    this.replaceForm = new FormControl('', {
      validators: Validators.required
    });
  }

  ngOnDestroy() {
    this.replaceForm.reset();
  }

  replace() {
  	// if (this.replaceForm.valid) {
  	// 	this.importS.regexpReplaceFieldElement(this.field.id, this.replaceForm.value)
  	// 								.subscribe(result => {
  	// 									//retour de la liste des valeurs mise à jour
  	// 									this.fieldS.values.next(result);
  	// 									this._snackBar.open('Liste des valeurs mise à jour', 'Fermer', {
			// 						      duration: 4000,
			// 						      verticalPosition: 'top'
			// 						    });
  	// 								},
			// 							error => { 
			// 								this._snackBar.open('Une erreur est survenue', 'Fermer', {
			// 						      duration: 4000,
			// 						      verticalPosition: 'top'
			// 						    }); 
  	// 								});
  	// }
  }

  displayFn(option): string {
    return option && option.champ ? option.champ : '';
  }
}
