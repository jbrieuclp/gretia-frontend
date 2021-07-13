import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { filter, tap, map, switchMap } from 'rxjs/operators';

import { ProjetRepository, Projet } from '../../repository/projet.repository';
import { Salarie } from '../../repository/salarie.repository';

@Injectable()
export class ProjetsService {

  public totalItems: number = 0;
	public projets: Projet[] = [];
	public projetSelect: BehaviorSubject<Projet> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;
	//gestion affichages sur pages projets display list/form
	public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
  	private projetR: ProjetRepository,
  ) { 
  	this.initForm();
  	this.setObservables();

  	this.loadProjets();
  }

  private get initialValues(): Projet {
    return {};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      code: [null, Validators.required],
      intitule: [null, Validators.required],
      objectif: [null],
      dateDebut: [null, Validators.required],
      dateFin: [null],
      projectType: [null, Validators.required],
      localisations: this.fb.array([], Validators.required),
      responsables: this.fb.array([], Validators.required),
    //  taches: this.fb.array([], Validators.required)
    });

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    this.projetSelect.asObservable()
      .pipe(
        tap(() => {
          //On vide préalablement le FormArray //.clear() existe en angular 8
          this.reset();
        }),
        switchMap((projet: Projet) => {
          //on oriente la source des données pour patcher le formulaire
          return projet ? this.projetSelect : of(this.initialValues);
        }),
        tap((projet: Projet) => {
          //mise en place des salarieForm
          if (projet.id === undefined) {
            this.addResponsable();
            this.addLocalisation();
          } else {
            projet.responsables.forEach((e, i)=>{
              this.addResponsable();
            });
            projet.localisations.forEach((e, i)=>{
              this.addLocalisation();
            });
          }
        })
      )
      .subscribe((values) => this.form.patchValue(values));
  }

  submit(): void { 	
    this.waiting = true;
    console.log(this.form)
    if (this.projetSelect.getValue()) {
      // //update
      // this.projetR
      //   .updateProjet(
      //     (this.projetSelect.getValue()).id,
      //     this.form.value
      //   )
      //   .pipe(
      //   	tap((): void => {
	     //    	this.waiting = false;
	     //    	this.reset();
      //       this.moveStepper(0);
      //       this.loadProjets();
	     //    })
	     //  )
      //   .subscribe(
      //     (projet: Projet) => this.projetSelect.next(projet),
      //     (err) => {
      //       this.waiting = false;
      //       //this._commonService.translateToaster("error", "ErrorMessage");
      //     }
        // );
    } else {
      //create
      this.projetR
        .createProjet(this.form.value)
        .pipe(
        	tap((): void => {
        		this.waiting = false;
            this.reset();
            this.moveStepper(0);
            this.loadProjets();
        	})
        )
        .subscribe(
          (projet: Projet) => this.projetSelect.next(projet),
          (err) => {
            this.waiting = false;
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
    }
  }

  delete(item: Projet): void {
  	const idx = this.projets.findIndex((projet)=>projet.id == item.id);
    if (idx > -1) {
    	// this.projetR.deleteProjet(item.id)
     //    .pipe(
     //      tap(()=>this.projetSelect.next(null))
     //    )
    	// 	.subscribe(data => this.projets.splice(idx, 1));
    }
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
	}

  reset() {
    this.form.reset(this.initialValues);
    this.clearFormArray(this.form.get("responsables") as FormArray);
    this.clearFormArray(this.form.get("localisations") as FormArray);
  }

  get responsables(): FormArray {
    return this.form.get("responsables") as FormArray;
  }

  addResponsable(value = null): void {
    this.responsables.push(new FormControl(null, [Validators.required]));
  }

  removeResponsable(i: number): void {
    this.responsables.removeAt(i);;
  }

  get localisations(): FormArray {
    return this.form.get("localisations") as FormArray;
  }

  addLocalisation(value = null): void {
    this.localisations.push(new FormControl(value, [Validators.required]));
  }

  removeLocalisation(i: number): void {
    this.localisations.removeAt(i);;
  }



  loadProjets() {
    this.projetR.projets()
      .pipe(
        tap((data: any)=>this.totalItems = data["hydra:totalItems"]),
        map((data: any): Projet[]=>data["hydra:member"])
      )
      .subscribe(
        (projets: Projet[]) => this.projets = projets
      );
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}
