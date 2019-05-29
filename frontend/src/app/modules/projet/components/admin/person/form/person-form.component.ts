import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Personne, PersonRepository } from '../../../../repository/person.repository'

@Component({
  selector: 'app-projet-admin-person-form',
  templateUrl: './person-form.component.html'
})
export class PersonFormComponent implements OnInit {

	form: FormGroup;
	person: Personne;
  @Output() saveChange: EventEmitter<boolean> = new EventEmitter();
  @Input('updatePerson') updatePerson: Personne = null;

  constructor(private fb: FormBuilder, private personR: PersonRepository) { }

  ngOnInit() {
  	this.setForm();

  }

  setForm() {
  	this.form = this.fb.group({
      nom: [null, [Validators.required]],
			prenom: [null, [Validators.required]],
			surnom: [null, [Validators.required]],
			compte: []
    });

    if (this.updatePerson !== null) {
      this.form.patchValue(this.updatePerson);
    }
  }

  save() {
    if (this.form.valid) { 
      if (this.updatePerson !== null) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  add() {
		this.personR.post(this.form.value)
							  		.subscribe(res => {
							          this.person = res;
                        this.saveChange.emit();
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.personR.put(this.updatePerson, this.form.value)
                    .subscribe(res => {
                        this.person = res;
                        this.saveChange.emit();
                      },
                      error => { /*this.errors = error.error;*/ }
                    );
  }

}
