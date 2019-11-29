import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ImportService } from '../../../services/import.service';

@Injectable()
export class LocalisationService {

  private _fichierId: BehaviorSubject<any> = new BehaviorSubject(null);
  values: BehaviorSubject<any[]> = new BehaviorSubject([]);
  error: BehaviorSubject<any> = new BehaviorSubject(null);;

  get fichierId(): any {
    return this._fichierId;
  }

  set fichierId(fichier: any) {
    this._fichierId.next(fichier);
  }

	constructor(private importS: ImportService) { 
    this.loadSubscribe();
  }

  loadSubscribe() {
    this.fichierId.subscribe(id=> {
      this.loadLocalisationValues();
    })
  }

  loadLocalisationValues() {
    let id = this.fichierId.getValue();
    if (id !== null) {
      this.importS.getLocalisationValues(id)
                    .subscribe(
                      values => this.values.next(values),
                      error => this.error.next(error.error.message)
                    );
    }
  }

  reset() {
    this._fichierId.next(null);
    this.values.next([]);
  }
}