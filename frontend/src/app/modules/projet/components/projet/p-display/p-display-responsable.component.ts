import { Component, OnInit, Input } from '@angular/core';
import { Personne, PersonRepository } from '../../../repository/person.repository';

@Component({
  selector: 'app-p-display-responsable',
  template: '{{responsable?.nom}} {{responsable?.prenom}}'
})
export class PDisplayResponsableComponent implements OnInit {

	@Input('responsable') 
		responsable: Personne;

  constructor(
  	private personR: PersonRepository
  ) { }

  ngOnInit() {
  	if (this.responsable !== null && typeof this.responsable.id !== 'undefined') {
  		this.getResponsable();
  	}
  	
  }

  getResponsable() {
    this.personR.get(this.responsable.id)
      .subscribe(
        res => {
          this.responsable = res;
        }
      );
  }

}
