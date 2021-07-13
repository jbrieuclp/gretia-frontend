import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { tap, map, switchMap, distinctUntilChanged, debounceTime } from "rxjs/operators";

import { ProjectFunding } from '../../../../../repository/conventions.repository'
import { ProjectFundingService } from './project-funding.service';

@Component({
  selector: '[app-projet-convention-project-funding-form-tr]',
  templateUrl: './project-funding-form.component.html',
  providers: [ProjectFundingService]
})
export class ProjectFundingFormComponent implements OnInit {


  get form(): FormGroup { return this.projectFundingS.form };
  set form(value) { this.projectFundingS.form = value };

  @Output() onCreate = new EventEmitter<ProjectFunding>();

  get displayForm(): boolean { return this.projectFundingS.displayForm; }
  set displayForm(value: boolean) { this.projectFundingS.displayForm = value; }
  
  get waiting(): boolean { return this.projectFundingS.waiting; }

  _addProjectFormDisplay: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get addProjectFormDisplay(): boolean { return this._addProjectFormDisplay.getValue(); };
  set addProjectFormDisplay(value: boolean) { this._addProjectFormDisplay.next(value); };

  newProjectForm: FormGroup;

  constructor(
  	private fb: FormBuilder,
  	private projectFundingS: ProjectFundingService,
  ) { }

  ngOnInit() {
    this.form.patchValue({})
  }

  save() {
    this.projectFundingS.submit()
      .pipe(
        tap(() => this.cancel())
      )
      .subscribe((projectFunding: ProjectFunding) => {
        this.onCreate.emit(projectFunding);
      });
  }

  cancel() {
    this.projectFundingS.displayForm = false;
    this.displayProjectForm(false);
    this.form.reset();
  }

  displayProjectForm(state: boolean = false) {
    if (state) {
      this.form = this.fb.group({
        project: this.fb.group({
          code: [null, Validators.required],
          intitule: [null, Validators.required],
          dateDebut: [null, Validators.required],
        }),
        eligibleFunding: [null, [Validators.required]],
      });
    } else {
      this.projectFundingS.initForm();
    }

    this.addProjectFormDisplay = state;
  }
}
