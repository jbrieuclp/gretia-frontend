import { Component, OnInit } from '@angular/core';

import { RepartitionService, LAYER } from '../../../../services/repartition.service';

@Component({
  selector: 'app-carto-taxons-panel',
  templateUrl: './taxons-panel.component.html',
  styleUrls: ['./taxons-panel.component.scss']
})
export class TaxonsPanelComponent implements OnInit {


  constructor(
    public repartS: RepartitionService
  ) { }

  ngOnInit() {
  }

  log(e) {
  	console.log(e);
  }
}
