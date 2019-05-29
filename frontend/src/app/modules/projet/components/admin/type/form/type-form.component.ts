import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Type, TypeRepository } from '../../../../repository/type.repository'

@Component({
  selector: 'app-projet-admin-type-form',
  templateUrl: './type-form.component.html'
})
export class TypeFormComponent implements OnInit {

	form: FormGroup;
	type: Type;
  @Output() saveChange: EventEmitter<boolean> = new EventEmitter();
  @Input('updateType') updateType: Type = null;

  constructor(private fb: FormBuilder, private typeR: TypeRepository) { }

  ngOnInit() {
  	this.setForm();

  }

  setForm() {
  	this.form = this.fb.group({
      libelle: [null, [Validators.required]]
    });

    if (this.updateType !== null) {
      this.form.patchValue(this.updateType);
    }
  }

  save() {
    if (this.form.valid) { 
      if (this.updateType !== null) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  add() {
		this.typeR.post(this.form.value)
							  		.subscribe(res => {
							          this.type = res;
                        this.saveChange.emit();
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.typeR.put(this.updateType, this.form.value)
                    .subscribe(res => {
                        this.type = res;
                        this.saveChange.emit();
                      },
                      error => { /*this.errors = error.error;*/ }
                    );
  }

}
