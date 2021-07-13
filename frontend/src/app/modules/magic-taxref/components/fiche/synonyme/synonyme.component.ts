import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { TaxrefRepository } from '../../../models/repositories';
import { FicheService } from '../fiche.service';
import { Taxref13 } from '../../../models/taxref13.model';

@Component({
  selector: 'app-magictaxref-fiche-synonyme',
  templateUrl: './synonyme.component.html',
  styleUrls: ['./synonyme.component.css']
})
export class SynonymeComponent implements OnInit {

  synonymes: Array<Taxref13>;
  loading: boolean  = false;
  
  constructor(
    private taxrefR: TaxrefRepository,
    private ficheS: FicheService,
  ) {
    this.synonymes = [];
  }

  ngOnInit() {
    this.ficheS.cdRef
      .pipe(
        switchMap(cdRef => this.getSynonymes(cdRef)),
        map((data: any): any[]=>data["hydra:member"])
      )
      .subscribe(synonymes => this.synonymes = synonymes);
  }

  getSynonymes(cd_ref: number): Observable<any> {
    this.loading = true;
    return this.taxrefR.getSynonymes(cd_ref)
      .pipe(
        tap(() => this.loading = false)
      );
  }
}
