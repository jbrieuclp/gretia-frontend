import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Mission } from '../../../repository/mission.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { TravailCategorie, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';


@Component({
  selector: 'app-s-form',
  templateUrl: './s-form.component.html',
  styleUrls: ['./s-form.component.css']
})
export class SFormComponent implements OnInit {

	form: FormGroup;
	missions: Observable<Mission[]>
	categories: Observable<TravailCategorie[]>
	user: BehaviorSubject<Personne>;

  constructor(
  	private fb: FormBuilder,
  	private personR: PersonRepository,
  	private suiveuseR: SuiveuseRepository,
  	private suiveuseS: SuiveuseService
  ) {}

  ngOnInit() {
  	this.user = this.suiveuseS.user.asObservable();
  	this.user.subscribe(person=>{
			if (person !== null) {
	  		this.missions = this.personR.getMissions(person.id);
			}
  	});
  	this.categories = this.suiveuseR.getCategories();
  	this.form = this.setForm();
  }

  private setForm(): FormGroup{
  	return this.fb.group({
      mission: [null, [Validators.required]],
      date: [null, [Validators.required]],
      categorie: [],
      duree: []
    });
  }

/*  save() {
    if (this.form.valid) {
      if (this.projet.id === undefined) {
        this.add();
      } else {
        this.update();
      }
    }
  }*/

}
