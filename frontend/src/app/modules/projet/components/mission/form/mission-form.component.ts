import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { ProjetFormService } from '../../../services/projet-form.service';
import { Mission, MissionTravailleur, MissionRepository } from '../../../repository/mission.repository';
import { Etat, EtatRepository } from '../../../repository/etat.repository';
import { MissionTravailleurFormComponent } from './m-travailleur-form.component';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-projet-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {

  //formulaire
  form: FormGroup;
  //Mission si update, null si create
  mission: Mission = {};
  travailleurs: MissionTravailleur[] = [];
  projet: Projet;
  firstPanelState: boolean = true;

  etats: Observable<Etat[]>;
  jourInUse: number = 0;

  constructor(
    private fb: FormBuilder, 
    private missionR: MissionRepository, 
    private projetR: ProjetRepository, 
    private etatR: EtatRepository,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //get ID projet
    let id_projet = this.route.snapshot.paramMap.get('projet');
    if ( id_projet !== null && Number.isInteger(Number(id_projet)) ) {
      this.projetR.getProjet(Number(id_projet))
        .subscribe(
          (projet: Projet) => {
            this.projet = projet;
          	this.form = this.setForm();
            
          },
          error => { /*this.errors = error.error;*/ }
        );
    } 

    this.getMission();
    this.etats = this.etatR.etats();

  }

  private setForm(): FormGroup{
    return this.fb.group({
      libelle: [null, [Validators.required]],
      detail: [null],
      nbJour: [null, [Validators.required, Validators.max((this.projet ? this.projet.nbJour : 0)), Validators.min(0)]],
      etat: [null, [Validators.required]]
    });
  }

  private getMission(): void {
    let id_mission = this.route.snapshot.paramMap.get('mission');
    if ( id_mission !== null && Number.isInteger(Number(id_mission)) ) {
      this.missionR.getMission(Number(id_mission))
          .subscribe(
            (mission: Mission) => {
              this.mission = mission;
              this.form = this.setForm();
              this.mission.etat = this.mission.etat.id;
              this.form.patchValue(this.mission);
              this.refreshJourInUse();
            },
            error => { /*this.errors = error.error;*/ }
          );

      this.missionR.getTravailleurs(Number(id_mission))
          .subscribe(
            (travailleurs: MissionTravailleur[]) => {
              this.travailleurs = travailleurs;
              this.refreshJourInUse();
            },
            error => { /*this.errors = error.error;*/ }
          );
    } 
  }

  save() {
    if (this.form.valid) {
      if (this.mission.id === undefined) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  add() {
		this.missionR.postMission(this.projet.id, this.form.value)
                   .subscribe((mission: Mission) => {
                      this.router.navigate(['/projet', 'mission', mission.id]);
                     },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  update() {
    this.missionR.putMission(this.mission, this.form.value)
                   .subscribe((mission: Mission) => {
                      this.mission = mission;
                      this.form.reset();
                      this.mission.etat = this.mission.etat.id;
                      this.form.patchValue(this.mission);
                      this.refreshJourInUse();
                    },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  removeTravailleur(travailleur) {
    this.missionR.removeTravailleur(this.mission, travailleur)
                   .subscribe(
                     (travailleurs: MissionTravailleur[]) => {
                       this.travailleurs = travailleurs;
                       this.refreshJourInUse();
                     },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  openDialog(travailleur): void {
    const dialogRef = this.dialog.open(MissionTravailleurFormComponent, {
      width: '300px',
      data: {
        mission: this.mission,
        travailleurs: this.travailleurs, 
        travailleur: travailleur
      }
    });

    dialogRef.afterClosed().subscribe(travailleurs => {
      if (travailleurs !== undefined) {
        this.travailleurs = travailleurs;
        this.refreshJourInUse();
      }
    });
  }

  removeDialog(travailleur): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirmer la suppression de "+travailleur.personne.surnom+" pour cette mission ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeTravailleur(travailleur);
      }
    });    
  }

  refreshJourInUse():void {
    let total = 0;
    for (let travailleur of this.travailleurs) {
      total += travailleur.temps;
    }
    this.jourInUse = total;
  }

}
