import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { filter, tap, map, switchMap, startWith } from 'rxjs/operators';

import { TaskRepository, Task } from '../../../../../../repository/task.repository';
import { Projet, Charge } from '../../../../../../repository/projet.repository';
import { ProjetService } from '../../../projet.service';
import { TaskService } from '../task.service';

@Injectable()
export class TaskFormService {

	public form: FormGroup;
  public waiting: boolean = false;
  public $projet: BehaviorSubject<Projet>;
  public stepper: MatStepper;

  get projet() {
    return this.projetS.projet.getValue();
  }

  constructor(
  	private fb: FormBuilder,
    private taskR: TaskRepository,
    private projetS: ProjetService,
    private taskS: TaskService
    
  ) {
    this.initForm();
    this.setObservables();
  }

  private get initialValues(): Task {
    return {};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      charge: [null],
      avancement: [null, Validators.required],
      intitule: [null, Validators.required],
      objectif: [null, Validators.required],
      nbJours: [null, [Validators.required/*, Validators.min()*/]]
    });

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    // //patch le form par les valeurs par defaut si creation
    // this.taskS.task.asObservable()
    //   .pipe(
    //     tap(() => {
    //       //On vide préalablement le FormArray //.clear() existe en angular 8
    //       this.reset();
    //     }),
    //     switchMap((task: Task) => {
    //       //on oriente la source des données pour patcher le formulaire
    //       return task ? this.taskS.task : of(this.initialValues);
    //     }),
    //     map((task: Task): any => {
    //       let values = Object.assign({}, task);
    //       values.charge = (values.charge === null || values.charge === undefined) ? null : values.charge['@id'];
    //       values.avancement = (values.avancement === null || values.avancement === undefined) ? null : values.avancement['@id'];
    //       return values;
    //     })
    //   )
    //   .subscribe((values) => this.form.patchValue(values));

    // //Gestion de l'erreur sur le nombre de jour dispo
    // this.form.get('charge').valueChanges
    //   .pipe(
    //     startWith(this.form.get('charge').value),
    //     tap(() => this.form.get('nbJours').setValidators([Validators.required])),
    //     map((value: string): Charge => this.projetS.charges.getValue().find(c => c['@id'] === value)),
    //     filter((charge: Charge) => (charge !== null && charge !== undefined)),
    //     map((charge: Charge): number => {
    //       let availableDay = charge.quantity;
    //       this.projetS.tasks.getValue().filter(t => t.charge !== null).forEach((task, i) => {
    //         if (task.charge['@id'] == charge['@id']) {
    //           availableDay = availableDay - task.nbJours;
    //         }
    //         //si on modifie une tache existante on ajoute les nombres de jours de la tache au décompte possible
    //         if (task['@id'] == this.taskS.task.getValue()['@id']) {
    //           availableDay = availableDay + this.taskS.task.getValue().nbJours;
    //         }
    //       });
    //       return availableDay;
    //     })
    //   )
    //   .subscribe(availableDay => this.form.get('nbJours').setValidators([Validators.required, Validators.max(availableDay)]));
  }

  reset() {
    this.form.reset(this.initialValues);
  }

  submit(): void {   
    // const data = this.form.value;
    // data.projet = this.projet['@id'];
    // this.waiting = true;

    // let api;
    // if (this.taskS.task.getValue()) {
    //   //update
    //   api = this.taskR.patch(
    //           (this.taskS.task.getValue())['@id'],
    //           data
    //         );
    // } else {
    //   //create
    //    api = this.taskR.createTask(data);
    // }

    // api
    //   .pipe(
    //     tap((task: Task) => { console.log(task); this.taskS.task.next(task);}),
    //     switchMap(() => this.projetS.reloadTasks()),
    //     tap((): void => {
    //       this.waiting = false;
    //       this.taskS.displayTaskForm = false;
    //     })
    //   )
    //   .subscribe(
    //     () => this.projetS.snackBar("Tâche ajoutée"),
    //     (err) => {
    //       this.waiting = false;
    //       //this._commonService.translateToaster("error", "ErrorMessage");
    //     }
    //   );
  }
}
