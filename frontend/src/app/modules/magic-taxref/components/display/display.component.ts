import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { VersioningService } from '../../services/versioning.service';

import { Taxon } from '../../models/taxon.model';
import { TaxonRepository } from '../../models/repositories/taxon.repository';

@Component({
  selector: 'vrs-display',
  templateUrl: './display.component.html',
  styleUrls: [],
  providers: [
    TaxonRepository
  ]
})
export class DisplayComponent implements OnInit {

	public taxon: Taxon;
  
  constructor(private _tr: TaxonRepository, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let cd_nom = params['cd_nom'];
      if (typeof(cd_nom) !== 'undefined' && Number.isInteger(Number(cd_nom))) {
        this.getTaxons(cd_nom);
      }
    });
  }

  getTaxons(cd_nom: number): void {
    this._tr.getTaxon(cd_nom).subscribe((taxon: Taxon) => {
      this.taxon = taxon;
    });
  }

  cdTaxonChange(cdNom: number) {
    this.getTaxons(cdNom);
  }

}
