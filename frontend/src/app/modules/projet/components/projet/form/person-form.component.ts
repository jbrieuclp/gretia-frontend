import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { Personne, Travailleur, PersonRepository } from '../../../repository/person.repository';

@Component({
  selector: 'app-projet-projet-add-person-form',
  templateUrl: './person-form.component.html'
})
export class PersonProjetFormComponent implements OnInit {

	listePersons: Observable<Personne[]>;
  form: FormGroup;
  @Input('projet') 
    projet: Projet;

  constructor( 
    private fb: FormBuilder,
    private _personR: PersonRepository,
    private _projetR: ProjetRepository
  ) {}

  ngOnInit() {
    this.createForm();
  	this.listePersons = this._personR.personnes();
  }

  createForm() {
    this.form = this.fb.group({
      personne: [null, [Validators.required]],
    });
  }

  addTravailleur() {
    let travailleur: Travailleur = {projet: this.projet, personne: this.form.value.personne, temps:0};
    this._projetR.postTravailleur(travailleur)
                      .subscribe(
                        res => {
                          this.projet.travailleurs = res;
                        }
                      );
  }

  isInProjet(person: Personne) {
    for (var i=0; i < this.projet.travailleurs.length; i++) {
      if ( this.projet.travailleurs[i].personne.id == person.id ) {
        return true;
      }
    }
  }

}
