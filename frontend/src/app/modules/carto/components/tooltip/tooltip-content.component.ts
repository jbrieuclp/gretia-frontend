import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { LayerService } from '../../services/layer.service';
import { Layer } from '../../layers/layer';

@Component({
  selector: 'app-carto-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TooltipContentComponent implements OnInit {

	@Input('layer_id') layer_id: any;
	@Input('feature') feature: any;

  constructor(
  	private layerS: LayerService,
  ) { }

  info: any = {};
  observateurs: Array<any> = null;
  afs: Array<any> = [];
  communes: Array<any> = null;
  counts: any = null;
  taxons: any = null;
  layer: Layer;


  ngOnInit() {
    this.layer = this.layerS.getLayer(this.layer_id);
    this.getInfo();
  }

  getInfo() {
    this.layerS.getObservateursInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => this.observateurs = res);

    this.layerS.getJDDsInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => {
                      let transit_afs = new Array();
                      for (let row of res) {
                        let id = row.id_af + '_';
                        if (transit_afs[id] === undefined) {
                          let af = {id: row.id_af, name: row.name_af, datasets: []};
                          transit_afs[id] = af;
                        }
                        let dataset = {id: row.id_dts, name: row.name_dts};
                        transit_afs[id].datasets.push(dataset);
                      }
                      for (let framwork in transit_afs) {
                        this.afs.push(transit_afs[framwork])
                      }
                    });

    this.layerS.getCommunesInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => this.communes = res);

    this.layerS.getCountsInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => this.counts = res);
  }
}
