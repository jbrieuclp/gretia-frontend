import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ImportService } from '../../../services/import.service';

@Injectable()
export class FormMapperService {

  fsdValues: BehaviorSubject<any[]> = new BehaviorSubject([]);

	constructor(private importS: ImportService) { 
    this.getFSDValue();
  }

  getFSDValue() {
    this.importS.getFSDFields()
          .subscribe(
            (fsds: any) => this.fsdValues.next(fsds),
            error => { /*this.errors = error.error;*/ }
          );
  }

}