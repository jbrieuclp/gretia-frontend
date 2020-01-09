import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-files-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilesListComponent implements OnInit {

	dataSource: Observable<any>;
  displayedColumns: string[] = ['id', 'table', 'fileName', 'avancement', 'dateImport', 'clos'];
  
  constructor(private importS: ImportService) { }

  ngOnInit() {
  	this.dataSource = this.importS.getFichiers().pipe(
		  tap(results => {
		    results.sort((t1, t2) => t1.id >= t2.id ? 1 : -1)
		  })
		);
  }

}
