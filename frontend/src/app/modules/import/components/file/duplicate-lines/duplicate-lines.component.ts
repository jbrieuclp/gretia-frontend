import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';

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

  checkAllStatus: boolean = false
  done: boolean = false

  constructor( 
  	private importS: ImportService,
  	public fileS: FileService,
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
      const control = new FormControl(false);
      (this.form.get('fields') as FormArray).push(control);
      control.valueChanges
                .subscribe((v)=>{
                  //retourne le nombre de checkbox non cochée, s'il y'en a on decoche ckeckAll
                  let nb_ckb_off = (this.form.get('fields') as FormArray).controls.filter(field=>!field.value).length
                  if (!v) { //si la case est décochée
                    this.checkAllStatus = false;
                  } else if (nb_ckb_off === 0) { //si tout est coché
                    this.checkAllStatus = true;
                  }
                });

    });
    console.log(this.form)
  }

  changeCheckAll(event) {
    this.checkAllStatus = event.checked;
    (this.form.get('fields') as FormArray).controls.forEach((control, idx) => {
      control.setValue(this.checkAllStatus);
    });
  }

  private getSelectedFields() {
    return this.form.value.fields
      .map((v, i) => v ? this.fields[i].id : null)
      .filter(v => v !== null);
  }

  submit() {
    this.nbDoublon = null;
    this.done = false;
    this.importS.checkDuplicateLines(this.fichier.id, this.getSelectedFields())
	  									.subscribe(data => {
	  										this.nbDoublon = data.nb_doublon
	  									});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cardHeight = window.innerHeight-130;
    this.cardContentHeight = this.cardHeight-70;
  }

  tagDuplicates() {
    this.importS.tagDuplicateLines(this.fichier.id, this.getSelectedFields())
                      .subscribe(data => {
                        this.fileS.recount();
                        this.done = data
                      });
  }

}
