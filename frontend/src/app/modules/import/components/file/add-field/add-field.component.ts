import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-file-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class FileAddFieldComponent implements OnInit {

	form: FormGroup;

	get field() {
		return this.form.get('field');
	}

  constructor(
  	private fb: FormBuilder,
    private importS: ImportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  	this.form = this.fb.group({
      'field': [null, [Validators.required, Validators.pattern('^[a-z][a-z_]*$')]],
    });
  }

  submit() {
    console.log(this.form);
    // if (this.form.valid) {
    //   this.importS.createObserver(this.form.value)
    //                 .subscribe(result => {

    //                   this._snackBar.open('Observateur ajouté', 'Fermer', {
    //                     duration: 4000,
    //                     verticalPosition: 'top'
    //                   }); 
    //                 },
    //                 error => { 
    //                   this._snackBar.open('Une erreur est survenue', 'Fermer', {
    //                     duration: 4000,
    //                     verticalPosition: 'top'
    //                   }); 
    //                 });
    // }
  }

}
