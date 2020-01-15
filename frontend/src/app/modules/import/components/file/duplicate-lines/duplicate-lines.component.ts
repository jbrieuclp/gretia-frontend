import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-duplicate-lines',
  templateUrl: './duplicate-lines.component.html',
  styleUrls: ['./duplicate-lines.component.scss'],
  providers: [FileService]
})
export class DuplicateLinesComponent implements OnInit {

	form: FormGroup;
	fields: any[];
	fichier: any;

	nbDoublon: number = null;

	cardHeight: any;
  cardContentHeight: any;

  checkAll: boolean = true;

  constructor( 
  	private importS: ImportService,
  	private fileS: FileService,
  	private fb: FormBuilder
  ) { }

  ngOnInit() {
  	this.cardHeight = window.innerHeight-130;
    this.cardContentHeight = this.cardHeight-70;
  	
  	this.fileS.file.subscribe(fichier => this.fichier = fichier);
  	
  	this.form = this.fb.group({
      fields: new FormArray([])
    });

  	this.fileS.mappedFields.subscribe(fields => {
  		this.fields = fields;
    	this.addCheckboxes();
  	});

  }

  private addCheckboxes() {
    this.fields.forEach((field, idx) => {
      const control = new FormControl(this.checkAll); // if first item set to true, else false
      (this.form.get('fields') as FormArray).push(control);
    });
  }

  submit() {
  	const selectedFields = this.form.value.fields
      .map((v, i) => v ? this.fields[i].champ : null)
      .filter(v => v !== null);

    this.importS.checkDuplicateLines(this.fichier.id, selectedFields)
    									.pipe(tap(()=>this.nbDoublon = null))
	  									.subscribe(data => {
	  										this.nbDoublon = data.nb_doublon
	  									});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cardHeight = window.innerHeight-130;
    this.cardContentHeight = this.cardHeight-70;
  }

}
