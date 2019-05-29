import { Component, OnInit } from '@angular/core';

import { Type, TypeRepository } from '../../../repository/type.repository'

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  types: Type[] = [];
  display: string;
  deleteType: Type = null;
	updateType: Type = null;
  
  constructor(private typeR: TypeRepository) { }

  ngOnInit() {
  	this.displayReset();
    this.loadTypes();
  }

  save() { 
    this.displayReset();
    this.loadTypes(); 
  }

  update(type: Type) {
    this.display = 'update-form';
    this.updateType = type;
  }

  deleteConfirm(type: Type) {
    this.display = 'delete';
    this.deleteType = type;
  }

  delete(type: Type) {
    this.typeR.delete(type)
          .subscribe( res => {
            if (res) { 
              this.displayReset(); this.loadTypes(); 
            } 
          });
  }

  loadTypes() {
    this.typeR.types().subscribe( res => this.types = res);
  }

  displayReset(){
    this.updateType = null;
    this.deleteType = null;
    this.display = null;
  }

}
