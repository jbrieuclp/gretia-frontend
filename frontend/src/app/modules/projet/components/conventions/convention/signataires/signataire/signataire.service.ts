import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Signataire } from '../../../../../repository/conventions.repository';
import { ConventionService } from '../../convention.service';

@Injectable()
export class SignataireService {

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
      organisme: [null, [Validators.required, Validators.pattern('^\/api\/organismes\/[0-9]+$')]],
    });
  }

  submit(signataire = null) {
  	this.waiting = true;
  	let api;
  	if ( signataire !== null ) {
  		api = this.conventionR.patch(signataire['@id'], this.form.value);
  	} else {
  		api = this.conventionR.postSignataires(
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
