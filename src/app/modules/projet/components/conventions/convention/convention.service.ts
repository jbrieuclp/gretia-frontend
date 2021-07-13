import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Location } from '@angular/common'; 
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ConventionsRepository, Convention } from '../../../repository/conventions.repository';

@Injectable()
export class ConventionService {

	public convention: BehaviorSubject<Convention> = new BehaviorSubject(null);
	public form: FormGroup;

	public loading: boolean = false;
	public displayForm: boolean = false;

  constructor(
  	private fb: FormBuilder,
  	private location: Location,
  	private conventionR: ConventionsRepository,
  ) { 
  	this.initForm();
  	this.setObservable();
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      intitule: [null, Validators.required],
      description: [null]
    });
  }

  setObservable() {
  	this.convention.asObservable()
  		.pipe(
        tap(() => this.form.reset()),
  			map((convention: Convention) => convention !== null ? convention : {}),
  		)
  		.subscribe((convention: Convention) => this.form.patchValue(convention));
  }

  submit() {
  	this.loading = true;
  	let api;
  	if ( this.convention.getValue() ) {
  		api = this.conventionR.patch(this.convention.getValue()['@id'], Object.assign(this.convention.getValue(), this.form.value));
  	} else {
  		api = this.conventionR.postConventions(this.form.value);
  			
  	}

  	api.pipe(
  				tap((convention: Convention) => this.convention.next(convention)),
  				map((convention: Convention): Number => convention.id),
  				tap(() => {
  					this.loading = false;
  					this.displayForm = false;
  				})
  			)
  			.subscribe(id => this.location.replaceState(`/projet/conventions/${id}`));
  }
}
