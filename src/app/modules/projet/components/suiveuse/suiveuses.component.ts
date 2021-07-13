import { Component, OnInit } from '@angular/core';

import { SuiveuseService } from './suiveuse.service';

@Component({
  selector: 'app-projet-suiveuses',
  templateUrl: './suiveuses.component.html',
  styleUrls: ['./suiveuses.component.scss']
})
export class SuiveusesComponent implements OnInit {

	/* Date selectionnée sur le calendrier */
  get selectedDate() {
    return this.suiveuseS.selectedDate;
  }

  constructor(
  	private suiveuseS: SuiveuseService,
  ) { }

  ngOnInit() {
  }

}
