import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';

import { ConventionsRepository, Convention, Financeur } from '../../../../repository/conventions.repository';
import { ConventionService } from '../convention.service';

@Component({
  selector: 'app-project-convention-financeurs',
  templateUrl: './financeurs.component.html',
  styleUrls: ['../table.scss']
})
export class FinanceursComponent implements OnInit, OnDestroy {

	public totalItems: number = 0;
	private _financeurs: Financeur[] = [];
  set financeurs(values: Financeur[]) { this._financeurs = values; };
  get financeurs(): Financeur[] { return this._financeurs.filter(v => v !== null); };
	public loadingList: boolean = false;
	get total(): number {
    let total = 0;
    this.financeurs.forEach(f => total += f.financement);
    return total;
  };

  public _subscriptions: Subscription[] = [];

  constructor(
  	private conventionR: ConventionsRepository,
  	private conventionS: ConventionService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(
    	this.conventionS.convention.asObservable()
    		.pipe(
    			filter((convention: Convention) => convention !== null),
    			switchMap((convention: Convention): Observable<Financeur[]> => this.getFinanceurs(convention.id)),
    		)
    		.subscribe((financeurs: Financeur[]) => this.financeurs = financeurs)
    );
  }

  getFinanceurs(convention_id): Observable<Financeur[]> {
  	this.loadingList = true;
  	return this.conventionR.conventionFinanceurs(convention_id)
  		.pipe(
  			tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Financeur[] => data["hydra:member"]),
        tap(() => this.loadingList = false),
  		);
  }

  financeurChange([id, financeur]) {
    const index = this._financeurs.findIndex(f => f['@id'] === id);
    this._financeurs[index] = financeur;
  }

  financeurCreate(financeur) {
    this._financeurs.push(financeur);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => { s.unsubscribe(); });
  }

}
