import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { LayerService } from '../../../services/layer.service';

@Component({
  selector: 'app-carto-tooltip-content-taxons',
  templateUrl: './tt-taxons.component.html',
  styleUrls: ['./tt-taxons.component.scss']
})
export class TooltipTaxonsComponent implements OnInit {

	@Input('layer') layer: any;
	@Input('feature') feature: any;
  taxons: any = null;

  constructor( private layerS: LayerService ) { }

  ngOnInit() { this.getTaxons(); }

  getTaxons() {
    this.layerS.getTaxonsInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => this.taxons = res);
  }

  getStatuts(statuts) {
  	return JSON.parse(statuts);
  }
}
