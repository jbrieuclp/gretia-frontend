import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Personne } from '../../../../repository/salarie.repository';
import { PersonneService } from './personne.service';

@Component({
  selector: 'app-projet-admin-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['../../../css/list-display.scss']
})
export class PersonnesComponent implements OnInit, OnDestroy {

	get personnes(): Personne[] {
    return this.personneS.personnes;
  }
  private id: string;

  @ViewChild('stepper', { static: true }) private stepper: MatStepper;

  constructor(
  	public personneS: PersonneService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    combineLatest(
      this.route.params.pipe(
        map(p => p.personne),
        filter(id => id !== undefined),
        tap(id => this.id = id.toString()),
      ),
      this.personneS._personnes.asObservable()
    )
      .pipe(
        map(([id, persons]): Personne => persons.find(person => person.id == id)),
        filter((person: Personne) => person !== undefined)
      )
      .subscribe((person: Personne) => this.personneS.personne.next(person));

    this.personneS.stepper = this.stepper;
  }

  selected(personne: Personne) {
    let url = this.id ? this.router.url.replace(this.id, personne.id.toString()) : `${this.router.url}/${personne.id.toString()}`;
    this.router.navigateByUrl(url);
  }

  create() {
    this.personneS.personne.next(null);
    this.personneS.moveStepper(1);
  }

  edit() {
    this.personneS.moveStepper(1);
  }

  ngOnDestroy() {
    this.personneS.personne.next(null);
  }
}
