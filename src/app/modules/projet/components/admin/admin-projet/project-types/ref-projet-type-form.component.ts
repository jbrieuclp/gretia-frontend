import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";

import { RefProjectTypeService } from './ref-project-type.service';

@Component({
  selector: 'app-project-admin-ref-projet-type-form',
  templateUrl: './ref-projet-type-form.component.html',
})
export class RefProjetTypeFormComponent implements OnInit {

	public form: FormGroup;
  isEdit(): boolean {
    return this.refProjectTypeS.refProjectType.getValue() !== null;
  }

  constructor(
  	private refProjectTypeS: RefProjectTypeService
  ) { }

  ngOnInit() {
  	this.form = this.refProjectTypeS.form;
  }

  save() {
  	this.refProjectTypeS.submit();
  }

  cancel() {
    this.refProjectTypeS.reset();
    this.refProjectTypeS.moveStepper(0);
  }

  get projectTypesControls() {
    return (this.form.get("projectTypes") as FormArray)
      .controls;
  }

}
