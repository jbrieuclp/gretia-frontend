import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';

import { ConventionsRepository, Convention } from '../../../repository/conventions.repository';
import { ConventionService } from './convention.service';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.scss']
})
export class ConventionComponent implements OnInit, OnDestroy {

	get convention(): Convention {
		return this.conventionS.convention.getValue();
	}
	public form: FormGroup;
  get loading(): boolean { return this.conventionS.loading; }
  get displayForm(): boolean { return this.conventionS.displayForm; }
  selectedIndex: BehaviorSubject<number> = new BehaviorSubject(0);

  onglets: string[] = ["details", "financeurs", "signataires", "projets", "echeances", "versements"];
  private _subscriptions: Subscription[] = [];

  constructor(
  	private route: ActivatedRoute,
    private location: Location,
  	private conventionR: ConventionsRepository,
  	private conventionS: ConventionService,
 	) { }

  ngOnInit() {

    this._subscriptions.push(
    	this.route.params.pipe(
        switchMap((params: any): Observable<Convention> => params.convention ? this.getConvention(params.convention) : of(null)),
      )
      .subscribe((convention: Convention) => this.conventionS.convention.next(convention))
    );

    this._subscriptions.push(
      combineLatest(
        this.route.params,
        this.conventionS.convention.asObservable()
      )  
        .pipe(
          filter(([params, convention]) => params.onglet !== undefined && convention !== null),
          map(([params, convention]) => params),
          map((params: any): number => this.onglets.findIndex(o => o === params.onglet)),
        )
        .subscribe((index: number) => this.selectedIndex.next(index))
    );

    this._subscriptions.push(
      this.selectedIndex.asObservable()
        .pipe(
          filter(() => this.convention !== null),
          map((index: number): [number, string] => [this.convention.id, this.onglets[index]]),
        )
        .subscribe(([id, onglet]) => this.location.go(`/projet/conventions/${id}/${onglet}`))
    );

    this.form = this.conventionS.form;
  }

  getConvention(id): Observable<Convention> {
  	this.conventionS.loading = true;
  	return this.conventionR.convention(id)
  		.pipe(
  			tap(() => this.conventionS.loading = false)
  		)
  }

  save() {
    this.conventionS.submit();
  }

  edit() {
  	this.conventionS.displayForm = true;
  }

  cancel() {
    this.conventionS.displayForm = false;
    this.form.reset();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => { s.unsubscribe(); });
  }
}
