import { Component, OnInit } from '@angular/core';

import { LayerService } from '../../../../services/layer.service';

@Component({
  selector: 'app-carto-taxons-panel',
  templateUrl: './taxons-panel.component.html',
  styleUrls: ['./taxons-panel.component.scss']
})
export class TaxonsPanelComponent implements OnInit {

  constructor(
    public layerS: LayerService
  ) { }

  ngOnInit() {
  }

  sliderChange(checked: boolean, layer) {
		layer.olLayer.setVisible(checked);
		layer.olLayer.set('displayInLegend', checked);
  }
}
