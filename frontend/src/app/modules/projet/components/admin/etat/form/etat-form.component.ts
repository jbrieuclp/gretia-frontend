import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Etat, EtatRepository } from '../../../../repository/etat.repository'

@Component({
  selector: 'app-projet-admin-etat-form',
  templateUrl: './etat-form.component.html'
})
export class EtatFormComponent implements OnInit {

	form: FormGroup;
	etat: Etat;
  @Output() saveChange: EventEmitter<boolean> = new EventEmitter();
  @Input('updateEtat') updateEtat: Etat = null;

  constructor(private fb: FormBuilder, private etatR: EtatRepository) { }

  ngOnInit() {
  	this.setForm();

  }

  setForm() {
  	this.form = this.fb.group({
      libelle: [null, [Validators.required]],
			ordre: []
    });

    if (this.updateEtat !== null) {
      this.form.patchValue(this.updateEtat);
    }
  }

  save() {
    if (this.form.valid) { 
      if (this.updateEtat !== null) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  add() {
		this.etatR.post(this.form.value)
							  		.subscribe(res => {
							          this.etat = res;
                        this.saveChange.emit();
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.etatR.put(this.updateEtat, this.form.value)
                    .subscribe(res => {
                        this.etat = res;
                        this.saveChange.emit();
                      },
                      error => { /*this.errors = error.error;*/ }
                    );
  }

}
