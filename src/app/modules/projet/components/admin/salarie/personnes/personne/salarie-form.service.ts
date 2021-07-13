import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class SalarieFormService {
  constructor(private fb: FormBuilder) {}

  createForm(value): FormGroup {
    let form = this.fb.group({
      fonction: [null, Validators.required],
      antenne: [null, Validators.required],
      dateDebut: [null, Validators.required],
      dateFin: [null],
      taux: [null, Validators.required]
    });

    form.patchValue(value);
    return form;
  }
}