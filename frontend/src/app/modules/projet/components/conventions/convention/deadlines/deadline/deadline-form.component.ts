import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { tap, map, switchMap, distinctUntilChanged, debounceTime } from "rxjs/operators";

import { ConventionsRepository, Deadline, DeadlineType } from '../../../../../repository/conventions.repository'
import { DeadlineService } from './deadline.service';

@Component({
  selector: 'app-projet-convention-deadline-form',
  templateUrl: './deadline-form.component.html',
  providers: [DeadlineService]
})
export class DeadlineFormComponent implements OnInit {

  public form: FormGroup;
  @Output() onCreate = new EventEmitter<Deadline>();
  get displayForm(): boolean { return this.deadlineS.displayForm; }
  set displayForm(value: boolean) { this.deadlineS.displayForm = value; }
  get waiting(): boolean { return this.deadlineS.waiting; }

  deadlineTypes: DeadlineType[] = [];

  constructor(
  	private fb: FormBuilder,
  	private deadlineS: DeadlineService,
  	private conventionR: ConventionsRepository,
  ) { }

  ngOnInit() {
  	this.conventionR.deadlineTypes()
			.pipe(
        map((data: any): DeadlineType[]=>data["hydra:member"])
      )
      .subscribe((deadlineTypes: DeadlineType[]) => this.deadlineTypes = deadlineTypes)

  	this.form = this.deadlineS.form;
    this.form.patchValue({})
  }

  save() {
    this.deadlineS.submit()
      .pipe(
        tap(() => this.cancel())
      )
      .subscribe((deadline: Deadline) => {
        this.onCreate.emit(deadline);
      });
  }

  cancel() {
    this.form.reset();
    this.deadlineS.displayForm = false;
  }
}
