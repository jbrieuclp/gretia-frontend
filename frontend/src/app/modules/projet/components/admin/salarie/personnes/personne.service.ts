import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { filter, tap, map, switchMap, catchError } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../shared';
import { SalarieRepository, Personne } from '../../../../repository/salarie.repository';
import { SalarieFormService } from './personne/salarie-form.service';

@Injectable()
export class PersonneService {

	public totalItems: number = 0;
  public _personnes: BehaviorSubject<Personne[]> = new BehaviorSubject([]);
  get personnes(): Personne[] { return this._personnes.getValue(); }
	public personne: BehaviorSubject<Personne> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;
  public loadingList: boolean = false;
	//gestion affichages sur pages personnes display list/form
	public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
  	private salarieR: SalarieRepository,
    private salarieFormS: SalarieFormService,
    private globalsS: GlobalsService,
  ) { 
  	this.initForm();
  	this.setObservables();

  	this.getPersonnes().subscribe(() => {return;});
  }

  getPersonnes(): Observable<Personne[]> {
    this.loadingList = true;
    return this.salarieR.personnes()
      .pipe(
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Personne[] => data["hydra:member"]),
        catchError(err => of([])),
        tap((personnes: Personne[]) => this._personnes.next(personnes)),
        tap(() => this.loadingList = false),
      );
  }

  private get initialValues(): Personne {
    return {};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      alias: [null, Validators.required]
    });

    this.addSalarieForm();

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    //patch le form par les valeurs par defaut si creation
    this.personne.asObservable()
      .pipe(
        tap(() => this.reset()),
        filter((personne)=>personne !== null),
        tap((personne) => {
          //Pour une modification (c'est forcément le cas ici) on supprime les form salariés
          this.clearFormArray("salaries");
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): void {   
    this.waiting = true;
    let api;
    if (this.personne.getValue()) {
      //update
      api = this.salarieR.patch((this.personne.getValue())['@id'], this.form.value);
    } else {
      //create
      api = this.salarieR.createPersonne(this.form.value);
    }

    api
      .pipe(
        tap((): void => {
          this.waiting = false;
          this.reset();
          this.moveStepper(0);
        }),
        tap((personne: Personne) => this.personne.next(personne)),
        switchMap(() => this.getPersonnes())
      )
      .subscribe(
        () => this.globalsS.snackBar({msg: "Enregistrement effectué"}),
        (err) => {
          err.error.violations.forEach(e => {
            this.globalsS.snackBar({msg: e.message, color: 'red', duration: null});
            this.form.get(e.propertyPath).setErrors({'inUse': true});
          })
        }
      );
  }

  delete(item: Personne): void {
  	const idx = this.personnes.findIndex((personne)=>personne.id == item.id);
    if (idx > -1) {
    	this.salarieR.deletePersonne(item.id)
        .pipe(
          tap(()=>this.personne.next(null))
        )
    		.subscribe(data => this.personnes.splice(idx, 1));
    }
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
	}

  reset() {
    this.form.reset(this.initialValues);
    this.clearFormArray("salaries");
    this.addSalarieForm();
  }

  addSalarieForm(): void {
    this.form.addControl('salaries', this.fb.array([]));
    (this.form.get('salaries') as FormArray).push(
      this.salarieFormS.createForm({taux: 100})
    );
  }

  private clearFormArray(item: string) {
    if (this.form.get(item)) {
      this.form.removeControl(item);
    }
  }
}
