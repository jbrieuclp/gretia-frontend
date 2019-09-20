import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Personne } from '../../../repository/person.repository';
import { TRAVAIL_OPTIONS, Travail, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';

@Component({
  selector: 'app-projet-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {

	@Input('date') date: string;
	@Input('user') user: Personne;
	travaux: Travail[];
	loading: boolean = false;

  constructor(
  	private suiveuseS: SuiveuseService,
  	private suiveuseR: SuiveuseRepository
  ) { }

  ngOnInit() {
  	console.log(this.loading);
  	this.loading = true;
  	let options = {startAt: this.date, endAt: this.date};
  	this.getTravaux(options);
  }

  getTravaux(options) {
  	this.suiveuseR.getTravaux(this.user.id, options)
  		.pipe(
	      finalize(() => this.loading = false)
	    )
  		.subscribe(travaux=>this.travaux = travaux)
  }

}
