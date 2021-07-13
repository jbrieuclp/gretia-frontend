import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { ConventionsRepository, Financeur } from '../../../../../repository/conventions.repository';
import { ConventionService } from '../../convention.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceurService {

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
      financement: [null, [Validators.required, Validators.pattern('^[0-9\.]+$')]]
    });
  }

  submit(financeur = null) {
  	this.waiting = true;
  	let api;
  	if ( financeur !== null ) {
  		api = this.conventionR.patch(financeur['@id'], this.form.value);
  	} else {
  		api = this.conventionR.postFinanceurs(
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
