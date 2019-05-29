import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { Organisme } from '../../../repository/organisme.repository';
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
	projet: Projet;
  projetTypes: Observable<Type[]>;
  projetResponsables: Observable<Personne[]>;

  @Output() saved: EventEmitter<number> = new EventEmitter();
  types: Observable<Type[]>;
  etats: Observable<Etat[]>;
//  @Input('updateEtat') updateEtat: Etat = null;

  constructor(private fb: FormBuilder, private projetR: ProjetRepository, private typeR: TypeRepository, private personR: PersonRepository, private etatR: EtatRepository) { }

  ngOnInit() {
    this.projet = {};
    this.types = this.typeR.types();
    this.etats = this.etatR.etats();
  	this.createForm();
  }

  createForm() {
  	this.form = this.fb.group({
      libelle: [null, [Validators.required]],
      localisation: [],
      partenairesFinanciers: this.fb.array([]),
      partenairesTechniques: this.fb.array([]),
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
      etat: []
    });

    this.projetTypes = this.typeR.types();
    this.projetResponsables = this.personR.personnes();
  }

  save() {
    this.add();
  }

  add() {
    let projet = Object.assign({}, this.form.value);
    projet.partenairesFinanciers = projet.partenairesFinanciers.map(org => org.id);
    projet.partenairesTechniques = projet.partenairesTechniques.map(org => org.id);
		this.projetR.post(projet)
							  		.subscribe(res => {
							          this.projet = res;
                        this.saved.emit(this.projet.id);
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  onOrgFinancierChoice($event) {
    if (typeof this.projet.partenairesFinanciers === 'undefined') {
      this.addOrgFinancier($event);
    } else {
      this.projet.partenairesFinanciers.push($event);
    }
  }
  onOrgTechniqueChoice($event) {
    if (typeof this.projet.partenairesTechniques === 'undefined') {
      this.addOrgTechnique($event);
    } else {
      this.projet.partenairesFinanciers.push($event);
    }
  }

  get orgFinancierFormArray(): FormArray{
    return this.form.get('partenairesFinanciers') as FormArray;
  }
  addOrgFinancier(organisme: Organisme){
    let fg = this.fb.group({id: '', nom: '', sigle: ''});
    fg.patchValue(organisme);
    this.orgFinancierFormArray.push(fg); 
    console.log(fg);
  }
  deleteOrgFinancier(idx: number) {
    this.orgFinancierFormArray.removeAt(idx);
  }


  get orgTechniqueFormArray(): FormArray{
    return this.form.get('partenairesTechniques') as FormArray;
  }
  addOrgTechnique(organisme: Organisme){
    let fg = this.fb.group({id: '', nom: '', sigle: ''});
    fg.patchValue(organisme);
    this.orgTechniqueFormArray.push(fg); 
    console.log(fg);
  }
  deleteOrgTechnique(idx: number) {
    this.orgTechniqueFormArray.removeAt(idx);
  }
}
