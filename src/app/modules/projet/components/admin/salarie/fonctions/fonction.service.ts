import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { filter, tap, map, catchError, switchMap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../shared';
import { SalarieRepository, Fonction } from '../../../../repository/salarie.repository'

@Injectable()
export class FonctionService {

	public fonctions: Fonction[] = [];
  public totalItems: number = 0;
	public fonction: BehaviorSubject<Fonction> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;
  public loadingList: boolean = false;
	//gestion affichages sur pages fonctions display list/form
	public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
  	private salarieR: SalarieRepository,
    private location: Location,
    private router: Router,
    private globalsS: GlobalsService,
  ) { 
  	this.initForm();
  	this.setObservables();

  	this.getFonctions().subscribe(() => {return;});
  }

  getFonctions(): Observable<Fonction[]> {
    this.loadingList = true;
    return this.salarieR.fonctions()
      .pipe(
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Fonction[] => data["hydra:member"]),
        catchError(err => of([])),
        tap((fonctions: Fonction[]) => this.fonctions = fonctions),
        tap(() => this.loadingList = false),
      );
  }

  private get initialValues(): Fonction {
    return {};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      label: [null, Validators.required]
    });

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    this.fonction.asObservable()
      .pipe(
        tap(() => this.form.reset(this.initialValues)),
        filter((fonction)=>fonction !== null),
        tap((fonction) => {
          //gestion de l'URL pour intégrer l'id de la fonction dedans
          let routeElements = (this.router.url.split('?')[0]).split('/');
          let params = this.router.url.split('?')[1] !== undefined ? '?' + this.router.url.split('?')[1] : '';
          const lastElement = routeElements.pop();
          if (isNaN(parseInt(lastElement))) {
            routeElements.push(lastElement);
          }
          routeElements.push((fonction.id).toString());
          this.location.go(`${routeElements.join('/')}${params}`);
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): void { 	
    this.waiting = true;
    let api;
    if (this.fonction.getValue()) {
      //update
      api = this.salarieR.patch((this.fonction.getValue())['@id'], this.form.value);
    } else {
      //create
      api = this.salarieR.createFonction(this.form.value);
    }

    api
      .pipe(
        tap((): void => {
          this.waiting = false;
          this.reset();
        }),
        tap((fonction: Fonction) => this.fonction.next(fonction)),
        switchMap(() => this.getFonctions())
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

  delete(item: Fonction): void {
    const idx = this.fonctions.findIndex((fonction)=>fonction.id == item.id);
    if (idx > -1) {
      this.salarieR.delete(item['@id'])
        .pipe(
          tap(() => this.fonction.next(null)),
          switchMap(() => this.getFonctions())
        )
        .subscribe(
          () => this.globalsS.snackBar({msg: "Fonction supprimée", color: 'green', duration: 4000}),
          (err) => this.globalsS.snackBar({msg: "Erreur inconnue", color: 'red', duration: 4000})
        );
    }
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
	}

  reset() {
    this.form.reset(this.initialValues);
    this.moveStepper(0);
  }
}
