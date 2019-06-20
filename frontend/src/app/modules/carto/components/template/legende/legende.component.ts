import { Component, OnInit } from '@angular/core';

import { LayerService } from '../../../services/layer.service';

@Component({
  selector: 'app-carto-legende',
  templateUrl: './legende.component.html',
  styleUrls: ['./legende.component.scss']
})
export class LegendeComponent implements OnInit {

  constructor(
  	public layerS: LayerService
  ) { }

  ngOnInit() {
  }

}
