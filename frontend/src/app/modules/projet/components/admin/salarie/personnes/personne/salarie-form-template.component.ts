import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { FonctionService } from '../../fonctions/fonction.service';
import { AntenneService } from '../../antennes/antenne.service';
import { Fonction, Antenne } from '../../../../../repository/salarie.repository';

@Component({
  selector: 'app-project-person-salarie-form-template',
  templateUrl: './salarie-form-template.component.html',
})
export class SalarieFormTemplateComponent {

	get fonctions(): Fonction[] { return this.fonctionS.fonctions; }
  get antennes(): Antenne[] { return this.antenneS.antennes; }

	@Input() form: FormGroup;

  constructor(
  	private fonctionS: FonctionService,
    private antenneS: AntenneService,
  ) { }
}
