import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { tap, map, switchMap, distinctUntilChanged, debounceTime } from "rxjs/operators";

import { Financeur } from '../../../../../repository/conventions.repository'
import { FinanceurService } from './financeur.service';

@Component({
  selector: '[app-projet-convention-financeur-form-tr]',
  templateUrl: './financeur-form.component.html',
  providers: [FinanceurService]
})
export class FinanceurFormComponent implements OnInit {

  public form: FormGroup;
  @Output() onCreate = new EventEmitter<Financeur>();
  get displayForm(): boolean { return this.financeurS.displayForm; }
  set displayForm(value: boolean) { this.financeurS.displayForm = value; }
  get waiting(): boolean { return this.financeurS.waiting; }

  constructor(
  	private fb: FormBuilder,
  	private financeurS: FinanceurService,
  ) { }

  ngOnInit() {
  	this.form = this.financeurS.form;
    this.form.patchValue({})
  }

  save() {
    this.financeurS.submit()
      .pipe(
        tap(() => this.cancel())
      )
      .subscribe((financeur: Financeur) => {
        this.onCreate.emit(financeur);
      });
  }

  cancel() {
    this.form.reset();
    this.financeurS.displayForm = false;
  }
}
