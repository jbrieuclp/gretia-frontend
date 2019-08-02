import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repartition-info',
  templateUrl: './repartition-info.component.html',
  styleUrls: ['../tooltip-layer.scss']
})
export class RepartitionInfoComponent implements OnInit {

  @Input() data: any;
	info: any = {};
  observateurs: Array<any> = null;
  afs: Array<any> = [];
  communes: Array<any> = null;
  counts: any = null;

  constructor() { }

  ngOnInit() {
  	this.getInfo();
  }

  getInfo() {
  	let layer = this.data.layer;
  	let feature = this.data.feature;
  	this.data.layerS.getObservateursInfo(layer, feature.get('id_area'))
  									.subscribe(res => this.observateurs = res);

    this.data.layerS.getJDDsInfo(layer, feature.get('id_area'))
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

    this.data.layerS.getCommunesInfo(layer, feature.get('id_area'))
                    .subscribe(res => this.communes = res);

    this.data.layerS.getCountsInfo(layer, feature.get('id_area'))
                    .subscribe(res => this.counts = res);
  }

}
