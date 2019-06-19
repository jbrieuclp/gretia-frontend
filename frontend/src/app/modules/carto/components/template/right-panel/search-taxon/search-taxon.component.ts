import { Component, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { TaxonService } from '../../../../services/taxon.service';
import { RepartitionService } from '../../../../services/repartition.service';

@Component({
  selector: 'app-carto-search-taxon',
  templateUrl: './search-taxon.component.html',
  styleUrls: ['./search-taxon.component.scss'],
  providers: [TaxonService]
})
export class SearchTaxonComponent {

  searchTerm$ = new Subject<any>();
  isWaiting: boolean = false;
  autocomplete: Array<any> = null;
  textTaxon: string = '';
  showSearchList:boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.showSearchList = true;
    } else {
      this.showSearchList = false;
    }
  }

  @ViewChild('zone') zone: ElementRef;

  constructor( 
    private eRef: ElementRef,
  	private taxonS: TaxonService,
    private repartitionS: RepartitionService
  ) { 
      //callback de resultat
      this.searchTaxons(this.searchTerm$).subscribe(results => true);
  }

  /* GET taxon whose name contains search term */
	searchTaxons(terms: Observable<any[]>) {
	  return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          this.autocomplete = null;
        	if (term.length >= 5) {
        		this.isWaiting = true;
            this.autocomplete = [];
        		return this.taxonS.searchTaxonsEntries(term);
        	} else { 
            return [];
          }
        }),
    		tap({
				    next: (val) => {
				    	this.isWaiting = false;
				    	this.autocomplete = val;
				    },
				    error: (error) => {
				    	this.isWaiting = false;
				    	this.autocomplete = [];
				      console.log('on error', error.message);
				    }
				  })
      );
	}

  selectTaxon(val: any){
    let taxon = val.nom_valide || null;
    if (taxon !== null) {
      this.repartitionS.addLayer(taxon);
      this.showSearchList = false;
      this.zone.nativeElement.value = '';
    }

  }
}
