import { Component, OnInit, Input } from '@angular/core';

import { Organisme, OrganismeRepository } from '../../../repository/organisme.repository';

@Component({
  selector: 'app-p-display-part',
  template: '{{organisme.nom}}'
})
export class PDisplayPartComponent implements OnInit {

	@Input('organisme') 
		organisme: Organisme;

  constructor(
  	private orgR: OrganismeRepository
  ) { }

  ngOnInit() {
  	if (this.organisme !== null && typeof this.organisme.id !== 'undefined') {
  		this.getOrganisme();
  	}
  	
  }

  getOrganisme() {
    this.orgR.get(this.organisme.id)
      .subscribe(
        res => {
          this.organisme = res;
        }
      );
  }

}