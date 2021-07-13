import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { ConventionsRepository, Convention } from '../../../../repository/conventions.repository';
import { ConventionService } from '../convention.service';

@Component({
  selector: 'app-project-convention-form',
  templateUrl: './convention-form.component.html',
  styleUrls: ['./convention-form.component.scss']
})
export class ConventionFormComponent implements OnInit {

	public form: FormGroup;

  constructor(
  	private conventionS: ConventionService,
  ) { }

  ngOnInit() {
  	this.form = this.conventionS.form;
  }

}
