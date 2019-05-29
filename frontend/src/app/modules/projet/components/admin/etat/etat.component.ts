import { Component, OnInit } from '@angular/core';

import { Etat, EtatRepository } from '../../../repository/etat.repository'

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {

  etats: Etat[] = [];
  display: string;
  deleteEtat: Etat = null;
	updateEtat: Etat = null;
  
  constructor(private etatR: EtatRepository) { }

  ngOnInit() {
  	this.displayReset();
    this.loadEtats();
  }

  save() { 
    this.displayReset();
    this.loadEtats(); 
  }

  update(etat: Etat) {
    this.display = 'update-form';
    this.updateEtat = etat;
  }

  deleteConfirm(etat: Etat) {
    this.display = 'delete';
    this.deleteEtat = etat;
  }

  delete(etat: Etat) {
    this.etatR.delete(etat)
          .subscribe( res => {
            if (res) { 
              this.displayReset(); this.loadEtats(); 
            } 
          });
  }

  loadEtats() {
    this.etatR.etats().subscribe( res => this.etats = res);
  }

  displayReset(){
    this.updateEtat = null;
    this.deleteEtat = null;
    this.display = null;
  }

}
