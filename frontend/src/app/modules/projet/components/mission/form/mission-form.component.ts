import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ValidateDate } from '../../../../../shared/validators/date.validator';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';

import { Projet } from '../../../repository/projet.repository';
import { Mission, MissionRepository } from '../../../repository/mission.repository';
import { Etat, EtatRepository } from '../../../repository/etat.repository';


@Component({
  selector: 'app-projet-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {
  form: FormGroup;
	mission: Mission;
  @Input('projet') projet: Projet = null;

  @Output() saved: EventEmitter<number> = new EventEmitter();
  etats: Observable<Etat[]>;

  constructor(
    private fb: FormBuilder, 
    private missionR: MissionRepository, 
    private etatR: EtatRepository,
    private router: Router) { }

  ngOnInit() {
    this.mission = {};
    this.etats = this.etatR.etats();
  	this.createForm();
  }

  createForm() {
  	this.form = this.fb.group({
      libelle: [null, [Validators.required]],
      detail: [],
      nbJour: [],
      etat: []
    });
  }

  save() {
    this.add();
  }

  add() {
    let mission = Object.assign({}, this.form.value);
    mission.projet = this.projet.id;
		this.missionR.post(mission)
							  		.subscribe(res => {
							          this.mission = res;
                        this.router.navigate(['projet', this.projet.id]);
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

}
