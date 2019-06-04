import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { Projet, ProjetRepository } from '../repository/projet.repository';
import { Mission, MissionRepository } from '../repository/mission.repository';

@Injectable()
export class ProjetFormService {

  projet: Projet;
  projetForm: FormGroup;
  mission: Mission;
  missionForm: FormGroup;


	constructor(
    private fb: FormBuilder, 
    private projetR: ProjetRepository, 
    private missionR: MissionRepository,
    private route: ActivatedRoute,
  ) {}

  initProjetForm(): FormGroup{

  }

  getMissionForm(): FormGroup {
    console.log(this.route)
    let form = this.initMissionForm();
    
//    this.missionR.get()
//                    .subscribe(
//                      res => form.patchValue(res),
//                      error => { /*this.errors = error.error;*/ }
//                    );  
    return form;
  }

  initMissionForm(): FormGroup{
    return this.fb.group({
      libelle: [null, [Validators.required]],
      detail: [],
      nbJour: [],
      etat: [],
      travailleurs: this.fb.array([this.createTravailleur()])
    });
  }

  createTravailleur(): FormGroup {
    return this.fb.group({
      person: [null, [Validators.required]],
      temps: [null, [Validators.required]]
    });
  }

  addTravailleur(travailleurs: FormArray): void {
    travailleurs.push(this.createTravailleur());
  }
}