import { Component, OnInit } from '@angular/core';

import { Organisme, OrganismeRepository } from '../../../repository/organisme.repository'

@Component({
  selector: 'app-admin-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.css']
})
export class OrganismeComponent implements OnInit {

  organismes: Organisme[] = [];
  display: string;
  deleteOrganisme: Organisme = null;
	updateOrganisme: Organisme = null;
  
  constructor(private organismeR: OrganismeRepository) { }

  ngOnInit() {
  	this.displayReset();
    this.loadOrganismes();
  }

  save() { 
    this.displayReset();
    this.loadOrganismes(); 
  }

  update(organisme: Organisme) {
    this.display = 'update-form';
    this.updateOrganisme = organisme;
  }

  deleteConfirm(organisme: Organisme) {
    this.display = 'delete';
    this.deleteOrganisme = organisme;
  }

  delete(organisme: Organisme) {
    this.organismeR.delete(organisme)
          .subscribe( res => {
            if (res) { 
              this.displayReset(); this.loadOrganismes(); 
            } 
          });
  }

  loadOrganismes() {
    this.organismeR.organismes().subscribe( res => this.organismes = res);
  }

  displayReset(){
    this.updateOrganisme = null;
    this.deleteOrganisme = null;
    this.display = null;
  }

}
