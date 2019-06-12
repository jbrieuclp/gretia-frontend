import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Personne, PersonRepository } from '../../../repository/person.repository';

@Component({
  selector: 'app-s-list',
  templateUrl: './s-list.component.html',
  styleUrls: ['./s-list.component.css']
})
export class SListComponent implements OnInit {

	persons: Observable<Personne[]>;

  constructor(private personR: PersonRepository) { }

  ngOnInit() {
  	this.persons = this.personR.personnes();
  }

}
