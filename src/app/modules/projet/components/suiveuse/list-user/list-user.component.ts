import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Personne, PersonRepository } from '../../../repository/person.repository';

@Component({
  selector: 'app-s-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class SListUserComponent implements OnInit {

	persons: Observable<Personne[]>;

  constructor(private personR: PersonRepository) { }

  ngOnInit() {
  	this.persons = this.personR.personnes();
  }

}
