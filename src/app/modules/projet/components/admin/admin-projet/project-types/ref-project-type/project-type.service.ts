import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

import { ProjectTypeRepository, ProjectType, RefProjectType } from '../../../../../repository/project-type.repository'
import { ProjectTypeFormService } from './project-type-form.service';
import { RefProjectTypeService } from '../ref-project-type.service';

@Injectable()
export class ProjectTypeService {

	public refProjectType: RefProjectType;
  public projectType: BehaviorSubject<ProjectType> = new BehaviorSubject(null);
	public form: FormGroup;
	public waiting: boolean = false;

  //gestion affichages sur pages refProjectTypes display list/form
  public stepper: MatStepper;

  constructor(
  	private fb: FormBuilder,
    private projectTypeR: ProjectTypeRepository,
    private projectTypeFormS: ProjectTypeFormService,
    private refProjectTypeS: RefProjectTypeService,
  ) { 
    this.refProjectType = this.refProjectTypeS.refProjectType.getValue();
    this.initForm();
    this.setObservables();
  }

  private get initialValues(): ProjectType {
    return {};
  }

  initForm(): void {
    this.form = this.projectTypeFormS.createForm(this.initialValues);
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

    //patch le form par les valeurs par defaut si creation
    //patch le form par les valeurs par defaut si creation
    this.projectType.asObservable()
      .pipe(
        tap(() => this.reset()),
        filter((projectType: ProjectType)=>projectType !== null),
        map((projectType: ProjectType): any => {
          // projectType.fonction = projectType.fonction ? projectType.fonction['@id'] : null; 
          // projectType.antenne = projectType.antenne ? projectType.antenne['@id'] : null; 
          return projectType;
        })
      )
      .subscribe((values) => {
        this.form.patchValue(values);
      });
  }

  submit(): Observable<ProjectType> {   
    this.waiting = true;
    let api;
    if (this.projectType.getValue()) {
      //update
      api = this.projectTypeR.patch((this.projectType.getValue())['@id'], this.form.value);
    } else {
      //create
      const value = Object.assign({refProjectType: this.refProjectType['@id']}, this.form.value);
      api = this.projectTypeR.createProjectType(value)
              .pipe(
                tap((projectType: ProjectType) => console.log(projectType)),
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