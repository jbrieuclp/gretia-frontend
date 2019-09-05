import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, SimpleChange, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Mission } from '../../../repository/mission.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { Travail, TravailCategorie, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';

@Component({
  selector: 'app-projet-travail-form',
  templateUrl: './travail-form.component.html',
  styleUrls: ['./travail-form.component.css']
})
export class TravailFormComponent implements OnInit {

	form: FormGroup;
  timeForm: FormGroup;
	missions: Observable<Mission[]>
	categories: Observable<TravailCategorie[]>
	user: BehaviorSubject<Personne>;
	travail: Travail = {};
  timeFormDisplay: boolean = false;
  @Input('date') date: string;
  @Output() onValidChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Travail>();

  constructor(
  	private fb: FormBuilder,
  	private personR: PersonRepository,
  	private suiveuseR: SuiveuseRepository,
  	private suiveuseS: SuiveuseService,
  	private route: ActivatedRoute,
  	private router: Router
  ) {}

  ngOnInit() {
  	this.user = this.suiveuseS.user.asObservable();
  	this.user.subscribe(person=>{
			if (person !== null) {
	  		this.missions = this.personR.getMissions(person.id);
			}
  	});
  	this.categories = this.suiveuseR.getCategories();
  	this.setForms();
  	this.getTravail();
  }

  ngOnChanges(changes: SimpleChanges) {
    const date: SimpleChange = changes.date;
    if (date.previousValue !== date.currentValue) {
      this.form.get('date').setValue(date.currentValue);
    }
  }

  private setForms(): void{
  	/*travail Form */
    //declaration
    this.form = this.fb.group({
      mission: [null, [Validators.required]],
      date: [this.date, [Validators.required]],
      categorie: [null, [Validators.required]],
      duree: [null, [Validators.pattern('^[0-9]+\.?[0-9]*$')]]
    });
    //changes event
    this.form.statusChanges.subscribe(val => {
      this.onValidChange.emit(this.form.valid);
    });

    /*Time Form */
    //declaration
    this.timeForm = this.fb.group({
                      heure: [null, [Validators.pattern('[0-9]+')]],
                      minutes: [null, [Validators.pattern('[0-9]+')]]
                    });
    //changes event
    this.timeForm.valueChanges.pipe(filter(value=>this.timeForm.valid)).subscribe(val => {
      let heure = +(val.heure|0);
      let minutes = +(val.minutes|0)/60;
      let duree = heure + minutes;

      this.form.get('duree').setValue(+(duree.toFixed(2)));
    });
  }

  private getTravail(): void {
    let id_travail = this.route.snapshot.paramMap.get('travail');
    if ( id_travail !== null && Number.isInteger(Number(id_travail)) ) {
      this.suiveuseR.getTravail(Number(id_travail))
          .subscribe(
            (travail: Travail) => {
              this.travail = travail;
              this.form.reset();
    					this.form.patchValue(this.travail);
            },
            error => { /*this.errors = error.error;*/ }
          );
    } 
  }

  save() {
    if (this.form.valid) {
      if (this.travail.id === undefined) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  add() {
		this.suiveuseR.postTravail(this.form.value)
							  		.subscribe(
                      (travail: Travail)=>{this.onSave.emit(travail);},
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.suiveuseR.putTravail(this.travail, this.form.value)
                   .subscribe(
                      (travail: Travail)=>{this.onSave.emit(travail);},
                      error => { /*this.errors = error.error;*/ }
                   );
  }

  getFormValue() {
    return this.form.value
  }

  resetForm(date=null) {
    this.form.reset();
    if (date !== null) {
      this.form.get('date').setValue(date);
    }
  }

}
