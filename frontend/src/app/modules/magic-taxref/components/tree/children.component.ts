import { Component, Injectable, OnInit, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { Taxref13Repository } from '../../models/repositories';
import { Taxref13 } from '../../models/taxref13.model';
import { Taxon } from '../../models/taxon.model';

@Component({
  selector: 'mtax-tree-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  providers: [
    Taxref13Repository
  ]
})
export class TreeChildrenComponent implements OnInit {

	@Input()
	taxon: Taxref13;

  @Input()
  indent: number;

  @Input()
  index: number;

  childrens: any;

  constructor(private _tr13: Taxref13Repository) { }

  ngOnInit() {
    this.childrens = [];
  }

  getChildrens(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._tr13.getChildrens(cd_ref)
      .subscribe( (childrens: any) => {
        this.childrens = childrens;
      });
  }

}
