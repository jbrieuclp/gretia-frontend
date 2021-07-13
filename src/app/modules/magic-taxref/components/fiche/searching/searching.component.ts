import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';

import { Taxon } from '../../../models/taxon.model';
import { TaxonRepository } from '../../../models/repositories/taxon.repository';

@Component({
  selector: 'app-magictaxref-fiche-searcher',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  searchTerm$ = new Subject<any>();
  isOpen: boolean;
  isWaiting: boolean = false;
  autocomplete: Array<any> = [];
  textTaxon: string = '';

  constructor(
    private taxonR: TaxonRepository, 
    private router: Router,
  ) { }


  ngOnInit() {
    //callback d'attente
    this.searchTerm$
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          return term.length >= 5 ?
            this.searchTaxons(term) : of([]);
        })
      )
      .subscribe(res => this.autocomplete = res);
  }

  searchTaxons(term): Observable<any[]> {
    this.isWaiting = true; 
    return this.taxonR.searchTaxons(term)  
      .pipe(
        tap(() => this.isWaiting = false),
        map((data: any): any[]=>data["hydra:member"])
      )
  }

  selectTaxon(val: any){
    this.textTaxon = val.nom_complet;
    this.router.navigateByUrl(`/taxref/taxon/${val.cd_nom}`);
  }
}