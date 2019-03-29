import { Component, OnInit, Input } from '@angular/core';

import { Taxref12Repository } from '../../models/repositories';
import { Taxref12 } from '../../models/taxref12.model';

@Component({
  selector: 'mtax-synonyme',
  templateUrl: './synonyme.component.html',
  styleUrls: ['./synonyme.component.css'],
  providers: [
    Taxref12Repository
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

  synonymes: Array<Taxref12>;
  
  constructor(private _tr12: Taxref12Repository) {
    this.synonymes = [];
  }

  ngOnInit() { }

  getSynonymes(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr12.getSynonymes(cd_ref)
      .subscribe( (synonymes: Taxref12[]) => {
        this.synonymes = synonymes;
      });
  }
}
