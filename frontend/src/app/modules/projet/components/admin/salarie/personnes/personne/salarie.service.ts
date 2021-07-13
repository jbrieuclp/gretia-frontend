import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { SalarieRepository, Salarie, Personne } from '../../../../../repository/salarie.repository'
import { SalarieFormService } from './salarie-form.service';
import { PersonneService } from '../personne.service';

@Injectable()
export class SalarieService {

	public personne: Personne;
  public salarie: BehaviorSubject<Salarie> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;

  //gestion affichages sur pages personnes display list/form
  public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
    private salarieR: SalarieRepository,
    private salarieFormS: SalarieFormService,
    private personneS: PersonneService,
  ) { 
    this.personne = this.personneS.personne.getValue();
    this.initForm();
    this.setObservables();
  }

  private get initialValues(): Salarie {
    return {taux: 100};
  }

  initForm(): void {
    this.form = this.salarieFormS.createForm(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    //patch le form par les valeurs par defaut si creation
    this.salarie.asObservable()
      .pipe(
        tap(() => this.reset()),
        filter((salarie: Salarie)=>salarie !== null),
        map((salarie: Salarie): any => {
          salarie.fonction = salarie.fonction ? salarie.fonction['@id'] : null; 
          salarie.antenne = salarie.antenne ? salarie.antenne['@id'] : null; 
          return salarie;
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): Observable<Salarie> {   
    this.waiting = true;
    let api;
    if (this.salarie.getValue()) {
      //update
      api = this.salarieR.patch((this.salarie.getValue())['@id'], this.form.value);
    } else {
      //create
      const value = Object.assign({personne: this.personne['@id']}, this.form.value);
      api = this.salarieR.createSalarie(value)
              .pipe(
                tap((salarie: Salarie) => console.log(salarie)),
              );
    }

    return api
      .pipe(
        tap((): void => {
          this.waiting = false;
          this.reset();
        })
      );   
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
  }

  reset() {
    this.form.reset(this.initialValues);
  }
}