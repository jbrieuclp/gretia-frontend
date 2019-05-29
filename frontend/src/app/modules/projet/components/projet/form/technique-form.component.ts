import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Organisme, OrganismeRepository } from '../../../repository/organisme.repository';

@Component({
  selector: 'app-projet-projet-technique-form',
  templateUrl: './technique-form.component.html'
})
export class TechniqueFormComponent implements OnInit {

	searchTerm$ = new Subject<any>();
	isWaiting: boolean = false;
  autocomplete: Array<any>= [];
  @Output() organisme = new EventEmitter<Organisme>();

  constructor( private _orgaR: OrganismeRepository) {}

  ngOnInit() {
  	//callback d'attente
    this.searchTerm$
      .subscribe(res => {
        this.autocomplete = []; 
        this.isWaiting = true; 
      });

    //callback de resultat, est executé à l'initiation mais observe la variable searchTerm$ coté repository
    this._orgaR.search(this.searchTerm$)
      .subscribe(results => {
        this.isWaiting = false;
        this.autocomplete = results;
      });
  }

  displayFn(auteur): string {
    return null;
	}

  onSelect($event) {
    this.organisme.emit($event.option.value);
    $event.option.deselect()
    this.autocomplete = [];
    this.isWaiting = false;
  }

}
