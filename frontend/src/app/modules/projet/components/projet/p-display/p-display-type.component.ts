import { Component, OnInit, Input } from '@angular/core';
import { Type, TypeRepository } from '../../../repository/type.repository';

@Component({
  selector: 'app-p-display-type',
  template: '{{type?.libelle}}'
})
export class PDisplayTypeComponent implements OnInit {

	@Input('type') 
		type: Type;

  constructor(
  	private typeR: TypeRepository
  ) { }

  ngOnInit() {
  	if (this.type !== null && typeof this.type.id !== 'undefined') {
  		this.getType();
  	}
  	
  }

  getType() {
    this.typeR.get(this.type.id)
      .subscribe(
        res => {
          this.type = res;
        }
      );
  }

}
