import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest  } from 'rxjs';
import { startWith, tap, map, switchMap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-files-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilesListComponent implements OnInit {

  filteredDataSource: Observable<any[]>;
  displayedColumns: string[] = ['id', 'table', 'fileName', 'avancement', 'dateImport', 'clos'];
  filterInput: FormControl;
  
  constructor(
    private importS: ImportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.filterInput = new FormControl('', []);

    this.filteredDataSource = combineLatest(
      (this.importS.getFichiers()
        .pipe(
          tap(results => {
            results.sort((t1, t2) => t1.id >= t2.id ? 1 : -1)
          })
        )), 
      this.filterInput.valueChanges.pipe(startWith(''))
    )
      .pipe(
        map(([dataSource, filteredValue]: [any[], string]): any[] => {
          return dataSource.filter(file => file.table.toLowerCase().includes(filteredValue.toLowerCase()));
        }),
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
