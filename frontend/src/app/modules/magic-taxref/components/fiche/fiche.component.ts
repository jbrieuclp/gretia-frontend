import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap, map, switchMap } from 'rxjs/operators';

import { FicheService } from './fiche.service';
import { Taxon } from '../../models/taxon.model';
import { TaxonRepository } from '../../models/repositories/taxon.repository';

@Component({
  selector: 'app-magictaxref-fiche',
  templateUrl: './fiche.component.html'
})
export class FicheComponent implements OnInit {

	get taxon(): Taxon { return this.ficheS.taxon.getValue(); };
  public loading: boolean = false;
  
  constructor(
    private taxonR: TaxonRepository, 
    private activatedRoute: ActivatedRoute,
    private ficheS: FicheService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        filter((params: any) => typeof(params.cd_nom) !== 'undefined' && Number.isInteger(Number(params.cd_nom))),
        map((params: any): number => params.cd_nom),
        switchMap(cd_nom => this.getTaxons(cd_nom))
      )
      .subscribe((taxon: Taxon) => this.ficheS.taxon.next(taxon));
  }

  getTaxons(cd_nom: number): Observable<Taxon> {
    this.loading = true;
    return this.taxonR.getTaxon(cd_nom)
      .pipe(
        tap(() => this.loading = false),
      );
  }
}
