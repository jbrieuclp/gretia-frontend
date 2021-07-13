import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { LocalisationService } from './localisation.service';

@Component({
  selector: 'app-projet-projet-localisation-form',
  templateUrl: './localisation-form.component.html'
})
export class LocalisationFormComponent implements OnInit {
	
	public form: FormGroup;

	get localisation() {
		return this.localisationS.localisationSelect.getValue();
	}

  constructor(
  	private localisationS: LocalisationService
  ) { }

  ngOnInit() {
  	this.form = this.localisationS.form;
  }

  save() {
  	this.localisationS.submit();
  }

  cancel() {
    this.localisationS.reset();
    this.localisationS.moveStepper(0);
  }
}
