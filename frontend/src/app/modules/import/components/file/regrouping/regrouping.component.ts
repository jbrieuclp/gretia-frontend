import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-regrouping',
  templateUrl: './regrouping.component.html',
  styleUrls: ['./regrouping.component.scss'],
  providers: [FileService]
})
export class RegroupingComponent implements OnInit {

	fichier: any;
	releves: any;

  constructor(
  	private router: Router,
  	private importS: ImportService,
  	public fileS: FileService
  ) { }

  ngOnInit() {
  	this.fileS.file.pipe(filter(fichier=>fichier !== null)).subscribe(fichier => {
  		this.fichier = fichier;
  		this.getRegrouping();
  	});
  	;
  }

  getRegrouping() {
  	this.importS.getRegrouping(this.fichier.id).subscribe(releves=>this.releves = releves);
  }

  regrouper() {
  	this.importS.setRegrouping(this.fichier.id).subscribe(releve=>this.router.navigate(['.']));
  }

}
