import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ImportService } from '../../services/import.service';

@Injectable()
export class FieldService {

  private _field: BehaviorSubject<any> = new BehaviorSubject(null);
  values: BehaviorSubject<any[]> = new BehaviorSubject([]);

  get field(): any {
    return this._field
                  .pipe(
                    filter(field => field !== null && field.id !== null )
                  );
  }

  set field(field: any) {
    this._field.next(field);
  }

	constructor(private importS: ImportService) { 
    this.loadSubscribe();
  }

  loadSubscribe() {
    this.field.subscribe(field=> {
      this.values.next([]);
      this.loadFieldValues(field.id);
    })
  }

  loadFieldValues(field_id) {
    this.importS.getFieldValues(field_id)
                  .subscribe(values => this.values.next(values))
  }

  reset() {
    this._field.next(null);
    this.values.next([]);
  }
}