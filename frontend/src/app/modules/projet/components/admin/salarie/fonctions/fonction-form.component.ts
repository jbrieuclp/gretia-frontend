import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FonctionService } from './fonction.service';

@Component({
  selector: 'app-projet-salarie-fonction-form',
  templateUrl: './fonction-form.component.html'
})
export class FonctionFormComponent implements OnInit {

	public form: FormGroup;
  isEdit(): boolean {
    return this.fonctionS.fonction.getValue() !== null;
  }

  constructor(
  	private fonctionS: FonctionService
  ) { }

  ngOnInit() {
  	this.form = this.fonctionS.form;
  }

  save() {
  	this.fonctionS.submit();
  }

  cancel() {
    if (this.fonctionS.fonction.getValue()) {
      this.fonctionS.fonctions.push(this.fonctionS.fonction.getValue());
    }
    this.fonctionS.reset();
  }
}
