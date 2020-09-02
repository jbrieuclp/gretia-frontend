import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { tap, map } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-import-search-loc',
  templateUrl: './search-loc.component.html',
  styleUrls: ['./search-loc.component.scss'],
  providers: [FileService]
})
export class SearchLocComponent implements OnInit {

	form: FormGroup;
	fields: any[];
	fichier: any;
  panelExpanded: boolean = true;

  checkAllStatus: boolean = false
  done: boolean = false

  localisations: any[] = [];

  constructor( 
  	private importS: ImportService,
  	public fileS: FileService,
  	private fb: FormBuilder
  ) { }

  ngOnInit() {	
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
  }

  private getSelectedFields() {
    return this.form.value.fields
      .map((v, i) => v ? this.fields[i].id : null)
      .filter(v => v !== null);
  }

  submit() {
    this.importS.getFieldsValues(this.getSelectedFields())
      .pipe(
        tap(()=>this.panelExpanded = false)
      )
      .subscribe(localisations=>this.localisations = localisations)
    
  }

}
