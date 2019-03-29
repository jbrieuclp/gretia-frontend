import { Component, Injectable, OnInit, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { Taxref12Repository } from '../../models/repositories';
import { Taxref12 } from '../../models/taxref12.model';

@Component({
  selector: 'mtax-tree',
  templateUrl: './tree.component.html',
  providers: [
    Taxref12Repository
  ]
})
export class TreeComponent implements OnInit {



	@Input()
	vTaxref: number;

  _cd_ref: number;
	@Input()
  public set cd_ref(val: number) {
    this._cd_ref = val;
  	this.parents = [];
    this.getParent(this._cd_ref);
  }

  parents: any;

  separator: string;

  constructor(private _tr12: Taxref12Repository) { 
  	this.separator = '-';
  }

  ngOnInit() {}

  getParent(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr12.getParents(cd_ref)
      .subscribe( (parents: any) => {
        this.parents = parents;
      });
  }

  getChildrens(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr12.getParents(cd_ref)
      .subscribe( (parents: any) => {
        this.parents = parents;
      });
  }

}
