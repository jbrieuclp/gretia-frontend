import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-projet-charge-type-form',
  templateUrl: './charge-type-form.component.html',
  styleUrls: ['./charge-type-form.component.scss']
})
export class ChargeTypeFormComponent {

	@Input('form') form: FormGroup;

  constructor() { }
}
