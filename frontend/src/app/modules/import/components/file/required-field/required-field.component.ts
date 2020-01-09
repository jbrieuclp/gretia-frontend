import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

import { ImportService } from '../../../services/import.service';
import { FileAddFieldComponent } from '../add-field/add-field.component';

@Component({
  selector: 'app-file-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.scss']
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
  	private importS: ImportService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
    	this.getFichier(Number(id_fichier));
    	this.getFields(Number(id_fichier));
    	this.fieldsFSD = this.importS.getFSDFields();
    }
  }

  getFichier(id) {
  	this.importS.getFichier(id)
          .subscribe(
            (fichier: any) => this.fichier = fichier,
            error => { /*this.errors = error.error;*/ }
          );
  }

  getFields(id) {
  	this.importS.getFields(id, true) //only-mapped = true)
  				.pipe(map(fields => {
  					fields.forEach((el, idx) => {
  						if ( !this.fsdMapped[el.fieldFSD.champ] ) {
  							this.fsdMapped[el.fieldFSD.champ] = [];
  						}
  						this.fsdMapped[el.fieldFSD.champ].push(el.champ);
  					});
  				}))
          .subscribe(
            (fields: any) => this.fields = fields,
            error => { /*this.errors = error.error;*/ }
          );
  }

  addFieldDialog(fsd): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {name: fsd.champ, fichier: this.fichier.id};
  	dialogConfig.maxWidth = '100%';
  	dialogConfig.width = '50%';
  	dialogConfig.height = '240px';
  	dialogConfig.position = {left: '25%', top: '100px'};

    const dialogRef = this.dialog
  													.open(FileRequiredFieldDialog, dialogConfig)
  													.afterClosed()
														  .subscribe(response => {
														  	
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
  template: `<app-import-file-add-field [name]="data.name" [fichier]="data.fichier"></app-import-file-add-field>`
})
export class FileRequiredFieldDialog {


  constructor (
    public dialogRef: MatDialogRef<FileRequiredFieldDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}