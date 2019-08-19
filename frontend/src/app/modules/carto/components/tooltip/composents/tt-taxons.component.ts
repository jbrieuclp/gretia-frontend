import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { LayerService } from '../../../services/layer.service';

@Component({
  selector: 'app-carto-tooltip-content-taxons',
  templateUrl: './tt-taxons.component.html',
  styleUrls: ['./tt-taxons.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TooltipTaxonsComponent implements OnInit {

	@Input('layer') layer: any;
	@Input('feature') feature: any;
	columnsToDisplay = ['cd_ref', 'nom_valide'];

  constructor(
  	private layerS: LayerService,
  ) { }

  taxons: any = null;


  ngOnInit() {
    this.getTaxons();
  }

  getTaxons() {
    this.layerS.getTaxonsInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => this.taxons = res);
  }

  getStatuts(statuts) {
  	return JSON.parse(statuts);
  }
}
