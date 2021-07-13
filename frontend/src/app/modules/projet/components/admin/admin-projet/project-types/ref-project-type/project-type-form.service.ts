import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class ProjectTypeFormService {
  constructor(private fb: FormBuilder) {}

  createForm(value): FormGroup {
    let form = this.fb.group({
      applicationDebut: [null, Validators.required],
      applicationFin: [null],
      coutJour: [null, Validators.required]
    });

    form.patchValue(value);
    return form;
  }
}