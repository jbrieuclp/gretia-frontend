import { Component, OnInit } from '@angular/core';

import { RepartitionService } from '../../../services/repartition.service';

@Component({
  selector: 'app-carto-legende',
  templateUrl: './legende.component.html',
  styleUrls: ['./legende.component.scss']
})
export class LegendeComponent implements OnInit {

  constructor(
  	public repartS: RepartitionService
  ) { }

  ngOnInit() {
  }

}
