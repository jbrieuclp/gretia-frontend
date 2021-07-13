import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';

import { ConventionsRepository, Convention, Signataire } from '../../../../repository/conventions.repository';
import { ConventionService } from '../convention.service';

@Component({
  selector: 'app-project-convention-signataires',
  templateUrl: './signataires.component.html',
  styleUrls: ['../table.scss']
})
export class SignatairesComponent implements OnInit {

  public totalItems: number = 0;
	private _signataires: Signataire[] = [];
  set signataires(values: Signataire[]) { this._signataires = values; };
  get signataires(): Signataire[] { return this._signataires.filter(v => v !== null); };
	public loadingList: boolean = false;

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
    			switchMap((convention: Convention): Observable<Signataire[]> => this.getSignataires(convention.id)),
    		)
    		.subscribe((signataires: Signataire[]) => this.signataires = signataires)
    );
  }

  getSignataires(convention_id): Observable<Signataire[]> {
  	this.loadingList = true;
  	return this.conventionR.conventionSignataires(convention_id)
  		.pipe(
  			tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): Signataire[] => data["hydra:member"]),
        tap(() => this.loadingList = false),
  		);
  }

  signataireChange([id, signataire]) {
    const index = this._signataires.findIndex(f => f['@id'] === id);
    this._signataires[index] = signataire;
  }

  signataireCreate(signataire) {
    this._signataires.push(signataire);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => { s.unsubscribe(); });
  }

}
