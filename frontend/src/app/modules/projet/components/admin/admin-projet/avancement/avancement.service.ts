import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { filter, tap, map, switchMap } from 'rxjs/operators';

import { TaskRepository, Avancement } from '../../../../repository/task.repository'

@Injectable()
export class AvancementService {

	public totalItems: number = 0;
  public avancements: Avancement[] = [];
	public avancementSelect: BehaviorSubject<Avancement> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;
	//gestion affichages sur pages avancements display list/form
	public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
  	private taskR: TaskRepository
  ) { 
  	this.initForm();
  	this.setObservables();

  	this.loadAvancements();
  }

  private get initialValues(): Avancement {
    return {
      ordre: this.totalItems + 1
    };
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      description: [null],
      ordre: [null, Validators.required],
    });

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des avancements automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    this.avancementSelect.asObservable()
      .pipe(
        tap(() => {
          //On vide préalablement le FormArray //.clear() existe en angular 8
          this.reset();
        }),
        switchMap((avancement) => {
          //on oriente la source des données pour patcher le formulaire
          return avancement ? this.avancementSelect : of(this.initialValues);
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): void {   
    this.waiting = true;
    if (this.avancementSelect.getValue()) {
      //update
      this.taskR
        .updateAvancement(
          (this.avancementSelect.getValue()).id,
          this.form.value
        )
        .pipe(
          tap((): void => {
            this.waiting = false;
            this.reset();
            this.moveStepper(0);
            this.loadAvancements();
          })
        )
        .subscribe(
          (avancement: Avancement) => this.avancementSelect.next(avancement),
          (err) => {
            this.waiting = false;
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
    } else {
      //create
      this.taskR
        .createAvancement(this.form.value)
        .pipe(
          tap((): void => {
            this.waiting = false;
            this.reset();
            this.moveStepper(0);
            this.loadAvancements();
          })
        )
        .subscribe(
          (avancement: Avancement) => this.avancementSelect.next(avancement),
          (err) => {
            this.waiting = false;
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
    }
  }

  delete(item: Avancement): void {
    this.taskR.deleteAvancement(item.id)
      .pipe(
        tap(()=>this.avancementSelect.next(null))
      )
      .subscribe(() => this.loadAvancements());
  }

  loadAvancements() {
    this.taskR.avancements()
      .pipe(
        tap((data: any)=>this.totalItems = data["hydra:totalItems"]),
        map((data: any): Avancement[]=>data["hydra:member"])
      )
      .subscribe(
        (avancements: Avancement[]) => this.avancements = avancements
      );
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
	}

  reset() {
    this.form.reset(this.initialValues);
  }
}
