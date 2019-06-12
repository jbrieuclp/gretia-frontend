import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Organisme, OrganismeRepository } from '../../../../repository/organisme.repository'

@Component({
  selector: 'app-projet-admin-organisme-form',
  templateUrl: './organisme-form.component.html'
})
export class OrganismeFormComponent implements OnInit {

	form: FormGroup;
	organisme: Organisme;
  @Output() saveChange: EventEmitter<Organisme> = new EventEmitter();
  @Input('updateOrganisme') updateOrganisme: Organisme = null;

  constructor(private fb: FormBuilder, private organismeR: OrganismeRepository) { }

  ngOnInit() {
  	this.setForm();

  }

  setForm() {
  	this.form = this.fb.group({
      nom: [null, [Validators.required]],
			sigle: []
    });

    if (this.updateOrganisme !== null) {
      this.form.patchValue(this.updateOrganisme);
    }
  }

  save() {
    if (this.form.valid) { 
      if (this.updateOrganisme !== null) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  add() {
		this.organismeR.post(this.form.value)
							  		.subscribe(res => {
							          this.organisme = res;
                        this.saveChange.emit(this.organisme);
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.organismeR.put(this.updateOrganisme, this.form.value)
                    .subscribe(res => {
                        this.organisme = res;
                        this.saveChange.emit();
                      },
                      error => { /*this.errors = error.error;*/ }
                    );
  }

}
