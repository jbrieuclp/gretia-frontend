import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ValidateDate } from '../../../../../shared/validators/date.validator';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';

import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { ProjetFormService } from '../../../services/projet-form.service';
import { Mission, MissionRepository } from '../../../repository/mission.repository';
import { Etat, EtatRepository } from '../../../repository/etat.repository';


@Component({
  selector: 'app-projet-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {

  //formulaire
  form: FormGroup;
  //Mission si update, null si create
	mission: Mission;
  id_projet: number;
  projet: Projet;

  etats: Observable<Etat[]>;

  constructor(
    private fs: ProjetFormService, 
    private missionR: MissionRepository, 
    private projetR: ProjetRepository, 
    private etatR: EtatRepository,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route)
    console.log(this.route.snapshot.paramMap.get('mission'))
    console.log(Number(this.route.snapshot.paramMap.get('mission')))
    console.log(isNaN(Number(this.route.snapshot.paramMap.get('mission'))));
    this.etats = this.etatR.etats();
  	this.getForm();
  }

  getForm() {
  	this.form = this.fs.getMissionForm();
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

  getProjet() {
    this.projetR.get(this.id_projet)
      .subscribe(
        res => {
          this.projet = res;
        }
      );
  }
}
