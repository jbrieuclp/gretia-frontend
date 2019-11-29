import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: '[app-import-add-observer]',
  templateUrl: './add-observer.component.html',
  styleUrls: ['./add-observer.component.scss']
})
export class AddObserverComponent implements OnInit {

	@Input() observer: any;
  @Output() observerChange = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private importS: ImportService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
        'nom': [this.getNom(), [Validators.required]],
        'prenom': [this.getPrenom(), []]
    });
  }

  getNom() {
    return this.observer.observer.match(/(.*?)\s.*/)[1]||'';
  }

  getPrenom() {
    return this.observer.observer.match(/.*?\s(.*)/)[1]||'';
  }

  submit() {
    if (this.form.valid) {
      this.importS.createObserver(this.form.value)
                    .subscribe(result => {
                      this.observer.observer = result;
                      this.observer.ok = true;
                      this.observerChange.emit(this.observer);
                      this._snackBar.open('Observateur ajouté', 'Fermer', {
                        duration: 4000,
                        verticalPosition: 'top'
                      }); 
                    },
                    error => { 
                      this._snackBar.open('Une erreur est survenue', 'Fermer', {
                        duration: 4000,
                        verticalPosition: 'top'
                      }); 
                    });
    }
  }

}
