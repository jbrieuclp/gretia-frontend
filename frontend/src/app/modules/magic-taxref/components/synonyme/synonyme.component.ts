import { Component, OnInit, Input } from '@angular/core';

import { Taxref13Repository } from '../../models/repositories';
import { Taxref13 } from '../../models/taxref13.model';

@Component({
  selector: 'mtax-synonyme',
  templateUrl: './synonyme.component.html',
  styleUrls: ['./synonyme.component.css'],
  providers: [
    Taxref13Repository
  ]
})
export class SynonymeComponent implements OnInit {

	@Input()
	vTaxref: number;

  _cd_ref: number;
	@Input()
  public set cd_ref(val: number) {
    this._cd_ref = val;
    this.getSynonymes(this._cd_ref);
  }

  synonymes: Array<Taxref13>;
  
  constructor(private _tr12: Taxref13Repository) {
    this.synonymes = [];
  }

  ngOnInit() { }

  getSynonymes(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr12.getSynonymes(cd_ref)
      .subscribe( (synonymes: Taxref13[]) => {
        this.synonymes = synonymes;
      });
  }
}
