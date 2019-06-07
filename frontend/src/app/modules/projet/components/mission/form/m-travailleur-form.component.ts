import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { filter, map } from 'rxjs/operators'; 

import { Mission, MissionTravailleur, MissionRepository } from '../../../repository/mission.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';


@Component({
  selector: 'app-projet-mission-travailleur-form',
  templateUrl: './m-travailleur-form.component.html'
})
export class MissionTravailleurFormComponent implements OnInit {

  //formulaire
  form: FormGroup;
  personnes: Observable<Personne[]>;

  //Tous les travailleurs de la mission
  travailleurs_dispo_ids: number[] = [];
  temps_dispo: number = 0;
  //Travailleur associé au formulaire actuel
  travailleur: MissionTravailleur;
  disabled: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private missionR: MissionRepository,
    private personR: PersonRepository,
    public dialogRef: MatDialogRef<MissionTravailleurFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getDispo();
    this.personnes = this.personR.personnes()
                            .pipe(
                              map(personnes => personnes.filter(personne => {
                                return this.travailleurs_dispo_ids.indexOf(personne.id) == -1;
                              }))
                             );
    this.form = this.setForm();

    if (this.data.travailleur.personne !== undefined) {
      this.form.patchValue({
        personne: this.data.travailleur.personne.id, 
        temps: this.data.travailleur.temps
      });
    }
  }

  private setForm(): FormGroup{
    return this.fb.group({
      personne: [null, [Validators.required]],
      temps: [null, [Validators.required, Validators.max(this.temps_dispo), Validators.min(0)]]
    });
  }

  private getDispo(){
    this.temps_dispo = this.data.mission.nbJour;
    this.data.travailleurs.forEach(trav => {
      if (this.data.travailleur.personne === undefined || trav.personne.id !== this.data.travailleur.personne.id) {
        this.travailleurs_dispo_ids.push(trav.personne.id);
        this.temps_dispo -= trav.temps;
      }
    }); 
  }

  save() {
    if (this.form.valid) {
      if (this.data.travailleur.personne !== undefined) {
        this.missionR.putTravailleurs(this.data.mission.id, this.data.travailleur.personne.id, this.form.value)
                      .subscribe(travailleurs => this.dialogRef.close(travailleurs));
      } else {
        this.missionR.postTravailleurs(this.data.mission.id, this.form.value)
                      .subscribe(travailleurs => this.dialogRef.close(travailleurs));
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(this.data.travailleurs);
  }

}
