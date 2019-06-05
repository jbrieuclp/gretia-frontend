import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from "@angular/forms";
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
  id_mission: string = null;
  id_projet: number;
  projet: Projet;
  firstPanelState: boolean = true;

  etats: Observable<Etat[]>;

  constructor(
    private fs: ProjetFormService, 
    private missionR: MissionRepository, 
    private projetR: ProjetRepository, 
    private etatR: EtatRepository,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.etats = this.etatR.etats();
  	this.getForm();
  }

  getForm() {
  	this.form = this.fs.missionForm;
    let id_projet = this.route.snapshot.paramMap.get('projet');
    if ( id_projet !== null && Number.isInteger(Number(id_projet)) ) {
      this.form.patchValue({projet: {id: Number(id_projet)}});
    }
    this.id_mission = this.route.snapshot.paramMap.get('mission');
    if ( this.id_mission !== null && Number.isInteger(Number(this.id_mission)) ) {
      console.log(this.id_mission);
      this.patchMission(Number(this.id_mission));
    }
  }

  save() {
    if (this.form.valid) {
      let mission = Object.assign({}, this.form.value);
      if (this.id_mission === null) {
      } else {
        this.update(mission);
      }

    }
  }

  add(mission) {
		this.missionR.post(mission)
                   .subscribe((mission: Mission) => {
                       this.router.navigate(['projet', mission.projet.id]);
                     },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  update(mission) {
    this.missionR.put(this.id_mission, mission)
                   .subscribe((mission: Mission) => {
                       this.router.navigate(['/projet', 'mission', mission.id]);
                     },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  addTravailleur() {
    this.fs.addTravailleur(<FormArray> this.form.get('travailleurs'));
  }

  getProjet() {
    this.projetR.get(this.id_projet)
      .subscribe(
        res => {
          this.projet = res;
        }
      );
  }

  patchMission(id: number) {
                      console.log("plop");
    this.missionR.get(id)
                  .subscribe(
                    res => {
                      console.log(res);
                      this.form.patchValue(res);
                      if (res.travailleurs) {
                        res.travailleurs.forEach((travailleur, idx) => {
                          this.addTravailleur();
                          (<FormArray> this.form.get('travailleurs')).controls[idx].patchValue(travailleur);
                        });
                      }

                    },
                    error => { /*this.errors = error.error;*/ }
                  ); 
  }

  ngOnDestroy() {
    this.fs.reset(this.form);
  }
}
