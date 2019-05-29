import { Component, OnInit, Input } from '@angular/core';

import { Projet } from '../../../repository/projet.repository';
import { Personne, PersonRepository } from '../../../repository/person.repository';

@Component({
  selector: 'app-p-display-travailleur',
  templateUrl: 'p-display-travailleur.component.html'
})
export class PDisplayTravailleurComponent implements OnInit {

	@Input('travailleur') 
		travailleur: any;

	@Input('projet') 
		projet: Projet;

	personne: Personne;
	temps: number;

  constructor(
  	private personR: PersonRepository
  ) { }

  ngOnInit() {
  	if (this.travailleur.personne !== null && typeof this.travailleur.personne.id !== 'undefined') {
  		this.getPersonne();
  	}
  	//on lie le projet au travailleur
  	this.temps = this.travailleur.temps !== null ? this.travailleur.temps : 0;  	
  }

  getPersonne() {
    this.personR.get(this.travailleur.personne.id)
      .subscribe(
        res => {
          this.personne = res;
        }
      );
  }

}