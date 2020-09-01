import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";

@Injectable()
export class TravailFormService {

  form: FormGroup;

  constructor( private fb: FormBuilder, ) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      mission: [null, [Validators.required]],
      date: [null, [Validators.required]],
      categorie: this.fb.group({
        id: [null, [Validators.required]]
      }),
      duree: [null, [Validators.required, Validators.pattern('^[0-9]+\.?[0-9]*$')]],
      detail: [null, []],
      personne: this.fb.group({
        id: [null, [Validators.required]]
      })
    });

  }

  resetForm(datePreserve: boolean = false) {
    let date = datePreserve ? this.form.get('date').value : null;
    this.form.reset({date: date});
  }

}