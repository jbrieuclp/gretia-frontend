import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, ProjectFunding } from '../../../../../repository/conventions.repository';
import { ConventionService } from '../../convention.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectFundingService {

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
      project: [null, [Validators.required]],
      eligibleFunding: [null, [Validators.required]],
    });
  }

  submit(project = null) {
  	this.waiting = true;
  	let api;
  	if ( project !== null ) {
  		api = this.conventionR.patch(project['@id'], this.form.value);
  	} else {
  		api = this.conventionR.postProjectFunding(
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
            this.initForm();
  				})
  			)
  }
}
