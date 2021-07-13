import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { map, tap, switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';
import { SalarieRepository, Personne } from '../../repository/salarie.repository';

@Component({
  selector: 'app-projet-control-salarie',
  templateUrl: './salarie-control.component.html',
  styleUrls: ['./salarie-control.component.scss']
})
export class SalarieControlComponent implements OnInit, OnDestroy {

	@Input() form: FormControl;
  personnes: Personne[] = [];
  historique: boolean = false;
  loading: boolean = false;
  _subscription: Subscription;

  constructor(
  	private salarieR: SalarieRepository
  ) { }

  ngOnInit() {
    this.loading = true;
    if (this.form.value !== null && this.form.value['@id'] !== undefined) {
      if ( this.form.value.personne.workIn === null ) {
        this.historique = true;
      }
      this.form.setValue(this.form.value['@id']);
    }


  	this._subscription = this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        distinctUntilChanged(),
        switchMap((val): Observable<Personne[]> => this.getPersonnes())
      )
  		.subscribe((personnes: Personne[]) => this.personnes = personnes);
  }

  getPersonnes(): Observable<Personne[]> {
    this.loading = true;
    return this.salarieR.personnes()
      .pipe(
        map((data: any): Personne[]=>data["hydra:member"]),
        tap(() => this.loading = false),
        tap((personnes: Personne[]) => this.setHistoricUser(personnes)),
      )
  }

  private setHistoricUser(persons): void {
    const id = this.form.value;
    this.historique = persons.filter(e => e.workIn).findIndex(e => e.workIn['@id'] === id) === -1;
  }

  displayLabel(personne, salarie = null): string {
    if (this.historique) {
      return `${ personne.nom } ${ personne.prenom } (ancien poste - du ${ moment(salarie.dateDebut).format('MM/DD/YYYY') } au ${ moment(salarie.dateFin).format('MM/DD/YYYY') })`;
    } else {
      return `${ personne.nom } ${ personne.prenom }`;
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
