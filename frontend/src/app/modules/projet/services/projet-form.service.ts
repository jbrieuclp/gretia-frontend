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
  mission: Mission = {};
  private _missionForm: FormGroup;


	constructor(
    private fb: FormBuilder, 
    private projetR: ProjetRepository, 
    private missionR: MissionRepository,
    private route: ActivatedRoute,
  ) {
    this.initMissionForm();
  }

  initProjetForm(){

  }

  get missionForm(): FormGroup {
    return this._missionForm;
  }

  private initMissionForm(): void{
    this._missionForm = this.fb.group({
      libelle: [null, [Validators.required]],
      detail: [''],
      nbJour: [''],
      etat: this.fb.group({
        id: [null, [Validators.required]]
      }),
      projet: this.fb.group({
        id: [null, [Validators.required]]
      }),
      travailleurs: this.fb.array([])
    });
  }

  private createTravailleur(): FormGroup {
    return this.fb.group({
      personne: this.fb.group({
        id: [null, [Validators.required]]
      }),
      temps: [null, [Validators.required]]
    });
  }

  addTravailleur(travailleurs: FormArray): void {
    travailleurs.push(this.createTravailleur());
  }

  reset(form: FormGroup): void {
    for (var k in form.controls ){ 
       if (form.controls[k] instanceof FormArray) {
         this.clearFormArray(<FormArray> form.controls[k]);
       }
    }
    form.reset();
  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}