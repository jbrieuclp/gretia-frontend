import { Component, Injectable, OnInit, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { Taxref12Repository } from '../../models/repositories';
import { Taxref12 } from '../../models/taxref12.model';
import { Taxon } from '../../models/taxon.model';

@Component({
  selector: 'mtax-tree-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  providers: [
    Taxref12Repository
  ]
})
export class TreeChildrenComponent implements OnInit {

	@Input()
	taxon: Taxref12;

  @Input()
  indent: number;

  @Input()
  index: number;

  childrens: any;

  constructor(private _tr12: Taxref12Repository) { }

  ngOnInit() {
    this.childrens = [];
  }

  getChildrens(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr12.getChildrens(cd_ref)
      .subscribe( (childrens: any) => {
        this.childrens = childrens;
      });
  }

}
