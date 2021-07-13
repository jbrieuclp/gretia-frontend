import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { filter, tap, map, switchMap, catchError } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../shared';
import { ProjectTypeRepository, RefProjectType } from '../../../../repository/project-type.repository';
import { ProjectTypeFormService } from './ref-project-type/project-type-form.service';

@Injectable()
export class RefProjectTypeService {

  public totalItems: number = 0;
  public _refProjectTypes: BehaviorSubject<RefProjectType[]> = new BehaviorSubject([]);
  get refProjectTypes(): RefProjectType[] { return this._refProjectTypes.getValue(); }
  public refProjectType: BehaviorSubject<RefProjectType> = new BehaviorSubject(null);
  public form: FormGroup;
  public waiting: boolean = false;
  public loadingList: boolean = false;
  //gestion affichages sur pages refProjectTypes display list/form
  public stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private projectTypeR: ProjectTypeRepository,
    private projectTypeFormS: ProjectTypeFormService,
    private globalsS: GlobalsService,
  ) { 
    this.initForm();
    this.setObservables();

    this.getRefProjectTypes().subscribe(() => {return;});
  }

  getRefProjectTypes(): Observable<RefProjectType[]> {
    this.loadingList = true;
    return this.projectTypeR.refProjectTypes()
      .pipe(
        tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): RefProjectType[] => data["hydra:member"]),
        catchError(err => of([])),
        tap((refProjectTypes: RefProjectType[]) => this._refProjectTypes.next(refProjectTypes)),
        tap(() => this.loadingList = false),
      );
  }

  private get initialValues(): RefProjectType {
    return {};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      description: [null],
      ordre: [null, Validators.required]
    });

    this.addProjectTypeForm();

    this.form.patchValue(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    //patch le form par les valeurs par defaut si creation
    this.refProjectType.asObservable()
      .pipe(
        tap(() => this.reset()),
        filter((refProjectType)=>refProjectType !== null),
        tap((refProjectType) => {
          //Pour une modification (c'est forcément le cas ici) on supprime les form salariés
          this.clearFormArray("projectTypes");
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): void {   
    this.waiting = true;
    let api;
    if (this.refProjectType.getValue()) {
      //update
      api = this.projectTypeR.patch((this.refProjectType.getValue())['@id'], this.form.value);
    } else {
      //create
      api = this.projectTypeR.createRefProjectType(this.form.value);
    }

    api
      .pipe(
        tap((): void => {
          this.waiting = false;
          this.reset();
          this.moveStepper(0);
        }),
        tap((refProjectType: RefProjectType) => this.refProjectType.next(refProjectType)),
        switchMap(() => this.getRefProjectTypes())
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

  delete(item: RefProjectType): void {
    const idx = this.refProjectTypes.findIndex((refProjectType)=>refProjectType.id == item.id);
    if (idx > -1) {
      this.projectTypeR.deleteRefProjectType(item.id)
        .pipe(
          tap(()=>this.refProjectType.next(null))
        )
        .subscribe(data => this.refProjectTypes.splice(idx, 1));
    }
  }

  moveStepper(index: number) {
    this.stepper.selectedIndex = index;
  }

  reset() {
    this.form.reset(this.initialValues);
    this.clearFormArray("projectTypes");
    this.addProjectTypeForm();
  }

  addProjectTypeForm(): void {
    this.form.addControl('projectTypes', this.fb.array([]));
    (this.form.get('projectTypes') as FormArray).push(
      this.projectTypeFormS.createForm({})
    );
  }

  private clearFormArray(item: string) {
    if (this.form.get(item)) {
      this.form.removeControl(item);
    }
  }
}
