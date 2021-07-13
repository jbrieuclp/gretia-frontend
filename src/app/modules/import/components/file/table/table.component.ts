import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { TableService } from './table.service';

@Component({
  selector: 'app-import-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService]
})
export class TableComponent implements AfterViewInit {

	@Input() fichier_id: number;
	@Input() filter: any = {};

	@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
  	public tableS: TableService
  ) { }

  ngAfterViewInit() {
    this.tableS.sort = this.sort;
    this.tableS.paginator = this.paginator;
  	this.tableS.getDataSource(this.fichier_id, this.filter);
  }
 
}
