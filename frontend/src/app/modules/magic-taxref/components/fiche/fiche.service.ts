import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';

import { Taxon } from '../../models/taxon.model';

@Injectable()
export class FicheService {

  taxon: BehaviorSubject<Taxon> = new BehaviorSubject(null);
  _cdRef: BehaviorSubject<number> = new BehaviorSubject(null);
  get cdRef(): Observable<number> {
  	return this._cdRef.asObservable()
  		.pipe(
  			distinctUntilChanged()
  		)
  }

  constructor() { 
  	this.taxon.asObservable()
  		.pipe(
  			map((taxon: Taxon): number => (taxon && taxon.latest) ? taxon.latest.cdRef : null)
  		)
  		.subscribe((cdRef: number) => this._cdRef.next(cdRef))
  }

}
