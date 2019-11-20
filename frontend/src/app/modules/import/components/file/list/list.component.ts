import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-files-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilesListComponent implements OnInit {

	dataSource: Observable<any>;
  displayedColumns: string[] = ['id', 'table', 'description', 'avancement', 'dateImport', 'clos'];
  
  constructor(private importS: ImportService) { }

  ngOnInit() {
  	this.dataSource = this.importS.getFichiers();
  }

}
