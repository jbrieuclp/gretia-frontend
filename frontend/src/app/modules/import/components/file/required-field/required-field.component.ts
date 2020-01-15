import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';
import { FileAddFieldComponent } from '../add-field/add-field.component';

@Component({
  selector: 'app-file-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.scss'],
  providers: [FileService]
})
export class FileRequiredFieldComponent implements OnInit {

	fichier: any;
	fields: any[] = [];
	fieldsFSD: Observable<any[]>;
	fsdMapped: any = {};

	get multiMapped() {
		let array = [];
		for (let key in this.fsdMapped) {
			if ( this.fsdMapped[key].length > 1 ) {
      	array.push({fsd: key, fields: this.fsdMapped[key]});
			}
    }
		return array;
	}

  constructor(
  	private route: ActivatedRoute,
  	public dialog: MatDialog,
  	private importS: ImportService,
    private fileS: FileService
  ) { }

  ngOnInit() {
  	this.fileS.file.subscribe(fichier=>this.fichier = fichier);
    this.getFields();
    this.fieldsFSD = this.fileS.FSDFields;

  }

  getFields() {
  	this.fileS.refreshFields(true) //only-mapped = true
  				.pipe(
            tap(fields=>{this.fsdMapped = []}),
            map(fields => {
              //regroupe dans un table de champs FSD les champs du fichier
    					fields.forEach((el, idx) => {
                //creation de la clé FSD dans le table si inexistante
    						if ( !this.fsdMapped[el.fieldFSD.champ] ) {
    							this.fsdMapped[el.fieldFSD.champ] = [];
    						}
                //ajout du champs du fichier sous la clé du table FSD
    						this.fsdMapped[el.fieldFSD.champ].push(el.champ);
    					});
    				})
          )
          .subscribe(
            (fields: any) => this.fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }

  addFieldDialog(fsd): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {name: fsd.champ, fichier: this.fichier};
  	dialogConfig.maxWidth = '100%';
  	dialogConfig.width = '50%';
  	dialogConfig.height = '240px';
  	dialogConfig.position = {left: '25%', top: '100px'};

    const dialogRef = this.dialog
  													.open(FileRequiredFieldDialog, dialogConfig)
  													.afterClosed()
														  .subscribe(response => {
                                if (response) {
														      this.fileS.snackBar('Champ ajouté'); 
                                }
														  });
  }

  isMapped(fsd): boolean {
  	let fsd_champs = Object.keys(this.fsdMapped);
  	return fsd_champs.includes(fsd.champ);
  }

}


/**********
* Input DIALOG
**********/
@Component({
  selector: 'app-import-field-add-required',
  templateUrl: './required-field.dialog.html',
})
export class FileRequiredFieldDialog {

  form: FormGroup;

  get field() {
    return this.form.get('field');
  }

  constructor(
    public dialogRef: MatDialogRef<FileRequiredFieldDialog>,
    private fb: FormBuilder,
    private importS: ImportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'field': [this.data.name, [Validators.required, Validators.pattern('^[a-z][a-z_]*$')]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.importS.addField(this.data.fichier.id, this.form.value)
                    .subscribe(result => {
                      this.dialogRef.close(true);
                    },
                    error => { 
                      //this.fileS.snackBar('Une erreur est survenue'); 
                    });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}