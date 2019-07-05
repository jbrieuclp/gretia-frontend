import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repartition-info',
  templateUrl: './repartition-info.component.html',
  styleUrls: ['../tooltip-layer.scss']
})
export class RepartitionInfoComponent implements OnInit {

  @Input() data: any;
	info: any = {};

  constructor() { }

  ngOnInit() {
  	this.getInfo();
  }

  getInfo() {
  	let layer = this.data.layer;
  	let feature = this.data.feature;
  	this.data.layerS.getFeatureInfo(layer, feature.get('id_area'))
  									.subscribe(res => this.info = res);
  }

}