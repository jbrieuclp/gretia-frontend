import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { tap, map, switchMap, distinctUntilChanged, debounceTime } from "rxjs/operators";

import { Signataire } from '../../../../../repository/conventions.repository'
import { SignataireService } from './signataire.service';

@Component({
  selector: '[app-projet-convention-signataire-form-tr]',
  templateUrl: './signataire-form.component.html',
  providers: [SignataireService]
})
export class SignataireFormComponent implements OnInit {

  public form: FormGroup;
  @Output() onCreate = new EventEmitter<Signataire>();
  get displayForm(): boolean { return this.signataireS.displayForm; }
  set displayForm(value: boolean) { this.signataireS.displayForm = value; }
  get waiting(): boolean { return this.signataireS.waiting; }

  constructor(
  	private fb: FormBuilder,
  	private signataireS: SignataireService,
  ) { }

  ngOnInit() {
  	this.form = this.signataireS.form;
    this.form.patchValue({})
  }

  save() {
    this.signataireS.submit()
      .pipe(
        tap(() => this.cancel())
      )
      .subscribe((signataire: Signataire) => {
        this.onCreate.emit(signataire);
      });
  }

  cancel() {
    this.form.reset();
    this.signataireS.displayForm = false;
  }
}
