import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { combineLatest, tap, map, startWith, filter } from 'rxjs/operators';

import { ImportService } from '../../../../services/import.service';
import { FileDataService } from '../../../../services/file.service';
import { FieldService } from '../../field.service';

@Component({
  selector: 'app-import-tools-replace-empty-by-field',
  templateUrl: './replace-empty-by-field.component.html',
  styleUrls: ['./replace-empty-by-field.component.scss']
})
export class ReplaceEmptyByFieldComponent implements OnInit, OnDestroy {

	replaceForm: FormControl;
	field: any;
  fieldList: Observable<any[]>;

  constructor(
  	private importS: ImportService,
    private fileDataS: FileDataService,
    private fieldS: FieldService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	
    this.fieldS.field.subscribe(field=>this.field = field);

    this.replaceForm = new FormControl('', {
      validators: Validators.required
    });

    this.fieldList = this.replaceForm.valueChanges
      .pipe(
        startWith(''),
        filter(term=>typeof term === "string"),
        map(term=>term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
        map((term: string): any[] => {
          return this.fileDataS.fields.getValue()
            .filter(option => {
              if ( option.fieldFSD ) {
                return option.champ.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term) 
                  || (option.description||'').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term)
                  || (option.fieldFSD.champ).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term)
                  || (option.fieldFSD.description||'').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term);
              } else {
                return option.champ.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term) 
                  || (option.description||'').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term)
              }
            });
        }),
      );

  }

  ngOnDestroy() {
    this.replaceForm.reset();
  }

  replace() {
  	if (this.replaceForm.valid) {
  		this.importS.replaceEmptyByField(this.field.id, this.replaceForm.value.id)
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

  displayFn(option): string {
    if (option && option.champ) {
      if ( option.fieldFSD ) {
        return option.champ + ' - (' + option.fieldFSD.description + ')';
      } else {
        return option.champ;
      }
    } else {
      return '';
    }
  }
}
