import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { filter, tap, map, switchMap } from 'rxjs/operators';

import { TaskRepository, Action } from '../../../../repository/task.repository'

@Injectable()
export class TaskActionService {

	public totalItems: number = 0;
  public actions: Action[] = [];
	public actionSelect: BehaviorSubject<Action> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;
	//gestion affichages sur pages actions display list/form
	public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
  	private taskR: TaskRepository
  ) { 
  	this.initForm();
  	this.setObservables();

  	this.loadActions();
  }

  private get initialValues(): Action {
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
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    this.actionSelect.asObservable()
      .pipe(
        tap(() => {
          //On vide préalablement le FormArray //.clear() existe en angular 8
          this.reset();
        }),
        switchMap((action) => {
          //on oriente la source des données pour patcher le formulaire
          return action ? this.actionSelect : of(this.initialValues);
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): void {   
    this.waiting = true;
    if (this.actionSelect.getValue()) {
      //update
      this.taskR
        .updateAction(
          (this.actionSelect.getValue()).id,
          this.form.value
        )
        .pipe(
          tap((): void => {
            this.waiting = false;
            this.reset();
            this.moveStepper(0);
            this.loadActions();
          })
        )
        .subscribe(
          (action: Action) => this.actionSelect.next(action),
          (err) => {
            this.waiting = false;
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
    } else {
      //create
      this.taskR
        .createAction(this.form.value)
        .pipe(
          tap((): void => {
            this.waiting = false;
            this.reset();
            this.moveStepper(0);
            this.loadActions();
          })
        )
        .subscribe(
          (action: Action) => this.actionSelect.next(action),
          (err) => {
            this.waiting = false;
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
    }
  }

  delete(item: Action): void {
    this.taskR.deleteAction(item.id)
      .pipe(
        tap(()=>this.actionSelect.next(null))
      )
      .subscribe(() => this.loadActions());
  }

  loadActions() {
    this.taskR.actions()
      .pipe(
        tap((data: any)=>this.totalItems = data["hydra:totalItems"]),
        map((data: any): Action[]=>data["hydra:member"])
      )
      .subscribe(
        (actions: Action[]) => this.actions = actions
      );
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
	}

  reset() {
    this.form.reset(this.initialValues);
  }
}
