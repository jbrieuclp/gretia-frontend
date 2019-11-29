import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-file-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class FileAddFieldComponent implements OnInit {

	form: FormGroup;
  fichier_id: number;

	get field() {
		return this.form.get('field');
	}

  constructor(
  	private fb: FormBuilder,
    private importS: ImportService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
      this.fichier_id = Number(id_fichier);
    } else { 
      this.router.navigate(['/import']); 
    }

  	this.form = this.fb.group({
      'field': [null, [Validators.required, Validators.pattern('^[a-z][a-z_]*$')]],
    });
  }

  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.importS.addField(this.fichier_id, this.form.value)
                    .subscribe(result => {
                      this._snackBar.open('Champ ajouté', 'Fermer', {
                        duration: 4000,
                        verticalPosition: 'top'
                      }); 
                      this.router.navigate(['../mapper'], { relativeTo: this.route });
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
