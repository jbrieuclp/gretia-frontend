import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-import-file-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss'],
  providers: [FileService]
})
export class FileAddFieldComponent implements OnInit {

	form: FormGroup;
  fichier: any;

	get field() {
		return this.form.get('field');
	}

  constructor(
  	private fb: FormBuilder,
    private importS: ImportService,
    public fileS: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fileS.file.subscribe(fichier=>this.fichier = fichier);

  	this.form = this.fb.group({
      'field': ['', [Validators.required, Validators.pattern('^[a-z][a-z_]*$')]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.importS.addField(this.fichier.id, this.form.value)
                    .subscribe(result => {
                      this.fileS.snackBar('Champ ajouté'); 
                      this.fileS.refreshFields();
                      this.router.navigate(['../mapper'], { relativeTo: this.route });
                    },
                    error => { 
                      this.fileS.snackBar('Une erreur est survenue'); 
                    });
    }
  }

}
