import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Projet, ProjetRepository } from '../../../repository/projet.repository';

@Component({
  selector: 'app-p-display',
  templateUrl: './p-display.component.html',
  styleUrls: ['./p-display.component.css']
})
export class PDisplayComponent implements OnInit {

	id: number;
	projet: Projet;

  constructor(
  	private route: ActivatedRoute,
  	private projetR: ProjetRepository
  ) { }

  ngOnInit() {
  	this.id = Number(this.route.snapshot.paramMap.get('id'));
  	this.getProjet();
  }

  getProjet() {
    this.projetR.get(this.id)
      .subscribe(
        res => {
          this.projet = res;
        }
      );
  }

  plop(event) {
    console.log(event);
  }
}
