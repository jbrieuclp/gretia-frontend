import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FichierService } from '../../../services/fichier.service';

@Component({
  selector: 'app-import-files-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilesListComponent implements OnInit {

	dataSource: Observable<any>;
  displayedColumns: string[] = ['id', 'table', 'description', 'avancement', 'dateImport', 'clos'];
  
  constructor(private fichierS: FichierService) { }

  ngOnInit() {
  	this.dataSource = this.fichierS.getFichiers();
  }

}
