import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

import { ValidateDate } from '../../../../../shared/validators/date.validator';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { PartenaireFormComponent } from './partenaire-form.component';
import { ProjetTravailleurFormComponent } from './p-travailleur-form.component';

import * as moment from 'moment';

moment.fn.toJSON = function() { return this.format('YYYY-MM-DD'); }

import { Projet, Organisme, ProjetTravailleur, ProjetRepository } from '../../../repository/projet.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { Type, TypeRepository } from '../../../repository/type.repository';
import { Etat, EtatRepository } from '../../../repository/etat.repository';

@Component({
  selector: 'app-projet-projet-form',
  templateUrl: './projet-form.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class ProjetFormComponent implements OnInit {

	form: FormGroup;
	projet: Projet = {};
  partFinanciers: Organisme[] = [];
  partTechniques: Organisme[] = [];
  travailleurs: ProjetTravailleur[] = [];
  jourInUse: number = 0;

  @Output() saved: EventEmitter<number> = new EventEmitter();
  types: Observable<Type[]>;
  etats: Observable<Etat[]>;
  responsables: Observable<Personne[]>;

  constructor(
    private fb: FormBuilder, 
    private projetR: ProjetRepository, 
    private typeR: TypeRepository, 
    private personR: PersonRepository, 
    private etatR: EtatRepository,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.setForm();
    this.getProjet();
    this.types = this.typeR.types();
    this.etats = this.etatR.etats();
    this.responsables = this.personR.personnes();
  }

  private getProjet(): void {
    let id_projet = this.route.snapshot.paramMap.get('projet');
    if ( id_projet !== null && Number.isInteger(Number(id_projet)) ) {
      this.projetR.getProjet(Number(id_projet))
          .subscribe(
            (projet: Projet) => {
              this.projet = projet;
              this.patchForm(this.projet);
              this.refreshJourInUse();
            },
            error => { /*this.errors = error.error;*/ }
          );

      this.projetR.getPartFinanciers(Number(id_projet))
          .subscribe(
            (partenaires: Organisme[]) => this.partFinanciers = partenaires,
            error => { /*this.errors = error.error;*/ }
          );

      this.projetR.getPartTechniques(Number(id_projet))
          .subscribe(
            (partenaires: Organisme[]) => this.partTechniques = partenaires,
            error => { /*this.errors = error.error;*/ }
          );

      this.projetR.getTravailleurs(Number(id_projet))
          .subscribe(
            (travailleurs: ProjetTravailleur[]) => {
              this.travailleurs = travailleurs;
              this.refreshJourInUse();
            },
            error => { /*this.errors = error.error;*/ }
          );
    } 
  }

  private setForm(): FormGroup{
  	return this.fb.group({
      libelle: [null, [Validators.required]],
      localisation: [],
      type: [],
      objet: [],
      milieux: [],
      groupes: [],
      nbJour: [],
      cout: [],
      coutTotal: [],
      responsable: [],
      dateDebut: [],
      dateFin: [],
      dateRendu: [],
      etat: [null, [Validators.required]]
    });
  }

  save() {
    if (this.form.valid) {
      if (this.projet.id === undefined) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  add() {
		this.projetR.postProjet(this.form.value)
							  		.subscribe((projet: Projet) => {
							          this.router.navigate([projet.id], {relativeTo: this.route});
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.projetR.putProjet(this.projet, this.form.value)
                   .subscribe((projet: Projet) => {
                      this.projet = projet;
                      this.patchForm(this.projet);
                      this.refreshJourInUse();
                    },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  patchForm(projet : Projet) {
    projet.etat = projet.etat.id;
    projet.type = projet.type.id;
    projet.responsable = projet.responsable.id;
    this.form.reset();
    this.form.patchValue(this.projet);
  }

  openPartenaireDialog(type, organismes): void {
    const dialogRef = this.dialog.open(PartenaireFormComponent, {
      width: '600px',
      data: {
        projet: this.projet,
        partenaires: organismes, 
        type: type
      }
    });

    dialogRef.afterClosed().subscribe(organismes => {
      if (type == 'f') {
        this.partFinanciers = organismes;
      } else if (type == 't') {
        this.partTechniques = organismes;
      }
    });
  }

  removePartenaireDialog(type, organisme: Organisme): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirmer la suppression de "+organisme.nom+" ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (type == 'f') {
          this.removePartFinancier(organisme);
        } else if (type == 't') {
          this.removePartTechnique(organisme);
        }
      }
    });
  }

  removePartFinancier(organisme) {
    this.projetR.removePartFinancier(this.projet, organisme)
                   .subscribe(
                     (organismes: Organisme[]) => this.partFinanciers = organismes,
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  removePartTechnique(organisme) {
    this.projetR.removePartTechnique(this.projet, organisme)
                   .subscribe(
                     (organismes: Organisme[]) => this.partTechniques = organismes,
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  openTravailleurDialog(travailleur): void {
    const dialogRef = this.dialog.open(ProjetTravailleurFormComponent, {
      width: '300px',
      data: {
        projet: this.projet,
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

  removeTravailleurDialog(travailleur): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirmer la suppression de "+travailleur.personne.surnom+" de ce projet ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeTravailleur(travailleur);
      }
    });
  }

  removeTravailleur(travailleur) {
    this.projetR.removeTravailleur(this.projet, travailleur)
                   .subscribe(
                     (travailleurs: ProjetTravailleur[]) => {
                       this.travailleurs = travailleurs;
                       this.refreshJourInUse();
                     },
                     error => { /*this.errors = error.error;*/ }
                   );
  }

  refreshJourInUse():void {
    let total = 0;
    for (let travailleur of this.travailleurs) {
      total += travailleur.temps;
    }
    this.jourInUse = total;
  }

}
