import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";


@Component({
  selector: 'app-project-project-type-form-template',
  templateUrl: './project-type-form-template.component.html',
})
export class ProjectTypeFormTemplateComponent {

	@Input() form: FormGroup;

  constructor() { }
}
