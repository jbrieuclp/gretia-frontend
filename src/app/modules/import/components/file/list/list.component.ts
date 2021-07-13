import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { startWith, tap, map, switchMap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-files-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilesListComponent implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'table', 'fileName', 'avancement', 'dateImport', 'clos'];
  filterInput: FormControl;
  closing: BehaviorSubject<boolean> = new BehaviorSubject(true);
  notClosing: BehaviorSubject<boolean> = new BehaviorSubject(true);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private importS: ImportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.filterInput = new FormControl('', []);

    combineLatest(
      (this.importS.getFichiers()
        .pipe(
          tap(results => {
            results.sort((t1, t2) => t1.id >= t2.id ? 1 : -1)
          })
        )), 
      this.filterInput.valueChanges.pipe(startWith('')),
      this.closing.asObservable(),
      this.notClosing.asObservable()
    )
    .pipe(
      map(([dataSource, filteredValue, closing, notClosing]: [any[], string, boolean, boolean]): any[] => {
        return dataSource.filter(file => {
          //si pas affiché fermés && fichier fermé
          if (!closing && file.clos) {
            return false;
          }
          //si pas affiché non fermés && fichier non fermé
          if (!notClosing && !(file.clos)) {
            return false;
          }
          return file.table.toLowerCase().includes(filteredValue.toLowerCase());
        });
      })
    )
    .subscribe(datasource=> {
      this.dataSource.data = datasource;
      this.dataSource.sort = this.sort;
    });

  }

  changeStatus(file) {
    this.importS.switchStatus(file.id)
                    .subscribe(result=> {
                      if (result) 
                        window.location.reload();
                    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'avancement': {
          return this.getAvancement(item);
        }
        default: {
          return item[property];
        }
      }
    };
  }

  getAvancement(file) {
    return file.champs.length ? (file.nb_field_ok / file.champs.length) * 100 : 0;
  }

}
