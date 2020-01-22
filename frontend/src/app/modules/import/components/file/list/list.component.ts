import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(
    private importS: ImportService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.dataSource = this.importS.getFichiers().pipe(
		  tap(results => {
		    results.sort((t1, t2) => t1.id >= t2.id ? 1 : -1)
		  })
		);
  }

  changeStatus(file) {
    this.importS.switchStatus(file.id)
                    .subscribe(result=> {
                      if (result) 
                        window.location.reload();
                    });
  }

}