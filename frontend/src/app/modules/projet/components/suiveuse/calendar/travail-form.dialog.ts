import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Mission } from '../../../repository/mission.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { Travail, TravailCategorie, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';
import { TravailFormService } from '../../../services/travail-form.service';

@Component({
  selector: 'app-carto-fond-plan-dialog',
  templateUrl: 'travail-form.dialog.html',
  styleUrls: ['./travail-form.dialog.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class TravailFormDialog implements OnInit {

  form: FormGroup;
  timeForm: FormGroup;
  dureeForm: FormControl;
  missions: Observable<Mission[]>;
  categories: Observable<TravailCategorie[]>;
  user: BehaviorSubject<Personne>;
  travail: Travail = {};
  optionsHour: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  optionsMinute: number[] = [0, 15, 30, 45];

  constructor (
    public dialogRef: MatDialogRef<TravailFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private personR: PersonRepository,
    private suiveuseR: SuiveuseRepository,
    private suiveuseS: SuiveuseService,
    private route: ActivatedRoute,
    private tfService: TravailFormService
  ) {}


  ngOnInit() {
    this.user = this.suiveuseS.user.asObservable();
    this.user.subscribe(person=>{
      if (person !== null) {
        this.missions = this.personR.getMissions(person.id);
      }
    });
    this.categories = this.suiveuseR.getCategories();
    this.setForms(this.data.date);
    this.getTravail();
  }

  public displayMission(mission): string {
    return mission ? mission.libelle : mission;
  }


  private setForms(date: Date = null): void{
    this.form = this.tfService.form;

    this.form.get('date').setValue(moment(date).format('YYYY-MM-DD'));
    this.form.get('personne').patchValue(this.suiveuseS.user.getValue());

    /*Duree Form */
    //declaration
    this.dureeForm = new FormControl(null, [Validators.pattern('^[0-9]+\.?(25|5|75)?0?$')]);

    this.timeForm = this.fb.group({
                      heure: [null, [Validators.pattern('[0-9]+')]],
                      minutes: [null, [Validators.pattern('[0-9]+')]]
                    });

    //changes event
    this.dureeForm.valueChanges
      .pipe(
        filter(()=>this.dureeForm.valid),
        map((duree)=>+(duree)*60),
        filter((duree)=>this.form.get('duree').value !== duree)
      )
      .subscribe(duree => {
        this.form.get('duree').setValue(duree);
      });

    this.timeForm.valueChanges
      .pipe(
        filter(()=>this.timeForm.valid),
        map((time)=>(+(time.heure)*60) + +(time.minutes)),
        filter((duree)=>this.form.get('duree').value !== duree)
      )
      .subscribe(duree => {
        this.form.get('duree').setValue(duree);
      });

    this.form.get('duree').valueChanges
      .pipe(filter(()=>this.form.get('duree').valid))
      .subscribe(duree => {
        this.dureeForm.setValue(Math.round((+(duree)/60)*100)/100);
        this.timeForm.setValue({heure: Math.trunc(+(duree)/60), minutes: duree%60});
      });
  }


  private getTravail(): void {
    if ( this.data.id_travail !== null ) {
      this.suiveuseR.getTravail(this.data.id_travail)
        .pipe(
          tap(()=>this.form.reset()),
          map((travail)=>{
            return travail;
          })
        )
        .subscribe(
          (travail: Travail) => {
            this.travail = travail;
            this.form.patchValue(this.travail);
          },
          error => { /*this.errors = error.error;*/ }
        );
    } 
  }

  save() {
    if (this.form.valid) {
      let travail = this.form.value;
      travail.mission = travail.mission.id;
      travail.categorie = travail.categorie.id;
      travail.personne = travail.personne.id;
      if (this.travail.id === undefined) {
        this.add(travail);
      } else {
        this.update(travail);
      }
    }
  }

  add(travail) {
    this.suiveuseR.postTravail(travail)
      .pipe(
        tap(()=>this.tfService.resetForm(true)), //conserve la date
      )
      .subscribe(
        (travail: Travail)=>this.onNoClick(),
        error => { /*this.errors = error.error;*/ }
      );
  }

  update(travail) {
    this.suiveuseR.putTravail(this.travail, travail)
      .pipe(
        tap(()=>this.tfService.resetForm(false)) //ne conserve pas la date
      )
      .subscribe(
        (travail: Travail)=>this.onNoClick(),
        error => { /*this.errors = error.error;*/ }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}