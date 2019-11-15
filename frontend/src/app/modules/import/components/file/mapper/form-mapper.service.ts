import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FichierService } from '../../../services/fichier.service';

@Injectable()
export class FormMapperService {

  fsdValues: BehaviorSubject<any> = new BehaviorSubject([]);

	constructor(private fichierS: FichierService) { 
    this.getFSDValue();
  }

  getFSDValue() {
    this.fichierS.getFSDFields()
          .subscribe(
            (fsds: any) => this.fsdValues.next(fsds),
            error => { /*this.errors = error.error;*/ }
          );
  }

}