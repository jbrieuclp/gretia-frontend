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
import { Personne, Travailleur } from '../../../repository/person.repository';

@Component({
  selector: 'app-projet-temps-travailleur-form',
  templateUrl: './temps-travailleur-form.component.html',
  styleUrls: ['./temps-travailleur-form.component.css']
})
export class TempsTravailleurFormComponent implements OnInit {

  @Input('travailleur') 
	  travailleur: any;
  @Input('projet') 
    projet: Projet;
  form: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private _projetR: ProjetRepository
  ) {}

  ngOnInit() {
    this.travailleur.projet = {id: this.projet.id};
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      temps: [this.travailleur.temps, [Validators.required]],
    });
  }

  submit($event) {
    if ( this.form.valid ) {
      this.travailleur.temps = this.form.value.temps;
      this.save();
    }
  }

  save() {
    this._projetR.putTravailleur(this.travailleur)
                      .subscribe(
                        res => {
                          this.projet.travailleurs = res;
                        }
                      );
  }

}
