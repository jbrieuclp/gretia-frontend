import { Component, OnInit } from '@angular/core';

import { Personne, PersonRepository } from '../../../repository/person.repository'

@Component({
  selector: 'projet-admin-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

	persons: Personne[] = [];
  display: string;
  deletePerson: Personne = null;
	updatePerson: Personne = null;
  
  constructor(private personR: PersonRepository) { }

  ngOnInit() {
  	this.displayReset();
    this.loadPersons();
  }

  save() { 
    this.displayReset();
    this.loadPersons(); 
  }

  update(person: Personne) {
    this.display = 'update-form';
    this.updatePerson = person;
  }

  deleteConfirm(person: Personne) {
    this.display = 'delete';
    this.deletePerson = person;
  }

  delete(person: Personne) {
    this.personR.delete(person)
          .subscribe( res => {
            if (res) { 
              this.displayReset(); this.loadPersons(); 
            } 
          });
  }

  loadPersons() {
    this.personR.personnes().subscribe( res => this.persons = res);
  }

  displayReset(){
    this.updatePerson = null;
    this.deletePerson = null;
    this.display = null;
  }
}
