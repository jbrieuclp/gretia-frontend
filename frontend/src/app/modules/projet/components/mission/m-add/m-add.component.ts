import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet, ProjetRepository } from '../../../repository/projet.repository';

@Component({
  selector: 'app-m-add',
  templateUrl: './m-add.component.html',
  styleUrls: ['./m-add.component.css']
})
export class MAddComponent implements OnInit {

	id_projet: number;
	projet: Projet;

  constructor(
		private route: ActivatedRoute,
  	private projetR: ProjetRepository) { }

  ngOnInit() {
  	this.id_projet = Number(this.route.snapshot.paramMap.get('id'));
  	this.getProjet();
  }

  getProjet() {
    this.projetR.get(this.id_projet)
      .subscribe(
        res => {
          this.projet = res;
        }
      );
  }

}
