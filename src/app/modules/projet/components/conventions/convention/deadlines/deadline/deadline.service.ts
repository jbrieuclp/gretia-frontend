import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Deadline } from '../../../../../repository/conventions.repository';
import { ConventionService } from '../../convention.service';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

	public form: FormGroup;
	public waiting: boolean = false;
	public displayForm: boolean = false;

  constructor(
  	private fb: FormBuilder,
    private globalsS: GlobalsService,
  	private conventionR: ConventionsRepository,
    private conventionS: ConventionService,
  ) { 
  	this.initForm();
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      deadlineType: [null, [Validators.required]],
      date: [null, [Validators.required]],
      comment: null,
      isReported: false,
      isObsolete: false,
    });
  }

  submit(deadline = null) {
  	this.waiting = true;
  	let api;
  	if ( deadline !== null ) {
  		api = this.conventionR.patch(deadline['@id'], this.form.value);
  	} else {
  		api = this.conventionR.postDeadlines(
                  Object.assign(
                    {convention: this.conventionS.convention.getValue()['@id']}, 
                    this.form.value
                  )
                );
  			
  	}

  	return api.pipe(
  				tap(() => {
  					this.waiting = false;
  					this.displayForm = false;
            this.globalsS.snackBar({msg: "Enregistrement effectué"});
  				})
  			)
  }
}
