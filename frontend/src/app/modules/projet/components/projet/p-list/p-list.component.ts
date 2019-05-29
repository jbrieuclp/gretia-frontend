import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Projet, ProjetRepository } from '../../../repository/projet.repository';

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.css']
})
export class PListComponent implements OnInit {

	projets: Observable<Projet[]>;

  constructor(private projetR: ProjetRepository) { }

  ngOnInit() {
  	this.getProjets();
  }

  getProjets() {
    this.projets = this.projetR.projets();
  }

}
