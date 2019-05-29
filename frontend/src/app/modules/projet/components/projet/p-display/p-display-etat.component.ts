import { Component, OnInit, Input } from '@angular/core';
import { Etat, EtatRepository } from '../../../repository/etat.repository';

@Component({
  selector: 'app-p-display-etat',
  template: '{{etat?.libelle}}'
})
export class PDisplayEtatComponent implements OnInit {

	@Input('etat') 
		etat: Etat;

  constructor(
  	private etatR: EtatRepository
  ) { }

  ngOnInit() {
  	if (this.etat !== null && typeof this.etat.id !== 'undefined') {
  		this.getEtat();
  	}
  	
  }

  getEtat() {
    this.etatR.get(this.etat.id)
      .subscribe(
        res => {
          this.etat = res;
        }
      );
  }

}
