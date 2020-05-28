import { ImportService } from '../../../services/import.service';

import { FileService } from '../../../services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
  providers: [FileService]
})
export class RecapComponent implements OnInit {

	fichier: any;
	releves: any;
	localisations: any;

  constructor(
  	private importS: ImportService,
    public fileS: FileService
  ) { }

  ngOnInit() {
  	this.fileS.file
						  	.subscribe(fichier=>{
						  		this.fichier = fichier
						  		this.getInfo();
						  	});
  }

  getInfo() {
  	this.getRelevesInfo();
  	this.getLocalisationsInfos();
  }

  getRelevesInfo() {
  	this.importS.getRegrouping(this.fichier.id).subscribe(infos=>this.releves = infos);
  }

  getLocalisationsInfos() {
  	this.importS.getLocalisationsInfo(this.fichier.id).subscribe(infos=>this.localisations = infos);
  }

}
