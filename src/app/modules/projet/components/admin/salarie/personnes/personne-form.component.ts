import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

import { PersonneService } from './personne.service';

@Component({
  selector: 'app-projet-personne-form',
  templateUrl: './personne-form.component.html'
})
export class PersonneFormComponent implements OnInit {

	public form: FormGroup;
  isEdit(): boolean {
    return this.personneS.personne.getValue() !== null;
  }

  constructor(
  	private personneS: PersonneService
  ) { }

  ngOnInit() {
  	this.form = this.personneS.form;
  }

  save() {
  	this.personneS.submit();
  }

  cancel() {
    this.personneS.reset();
    this.personneS.moveStepper(0);
  }

  get salarieControls() {
    return (this.form.get("salaries") as FormArray)
      .controls;
  }
}
