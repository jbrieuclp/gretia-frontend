import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ImportService } from '../../services/import.service';

@Injectable()
export class FieldService {

  private _field: BehaviorSubject<any> = new BehaviorSubject(null);
  values: BehaviorSubject<any[]> = new BehaviorSubject([]);

  get field(): any {
    return this._field;
  }

  set field(field: any) {
    this._field.next(field);
  }

	constructor(private importS: ImportService) { 
    this.loadSubscribe();
  }

  loadSubscribe() {
    this.field.subscribe(field=> {
      this.loadFieldValues();
    })
  }

  loadFieldValues() {
    let field = this.field.getValue();
    if (field !== null && field.id !== null) {
      this.importS.getFieldValues(field.id)
                    .subscribe(values => this.values.next(values))
    }
  }

  reset() {
    this._field.next(null);
    this.values.next([]);
  }
}