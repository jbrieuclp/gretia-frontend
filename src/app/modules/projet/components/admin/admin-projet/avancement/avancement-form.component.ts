import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { AvancementService } from './avancement.service';

@Component({
  selector: 'app-projet-projet-avancement-form',
  templateUrl: './avancement-form.component.html'
})
export class AvancementFormComponent implements OnInit {
	
	public form: FormGroup;

	get localisation() {
		return this.avancementS.avancementSelect.getValue();
	}

  constructor(
  	private avancementS: AvancementService
  ) { }

  ngOnInit() {
  	this.form = this.avancementS.form;
  }

  save() {
  	this.avancementS.submit();
  }

  cancel() {
    this.avancementS.reset();
    this.avancementS.moveStepper(0);
  }
}
