import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { LayerService } from '../../../../services/layer.service';
import { GlobalsService } from '../../../../../../shared/services/globals.service';

@Component({
  selector: 'app-carto-tooltip-content-taxons',
  templateUrl: './tt-taxons.component.html',
  styleUrls: ['../tt-taxons.component.scss'],
  providers: [GlobalsService]
})
export class TooltipTaxonsComponent implements OnInit {

	@Input('layer') layer: any;
	@Input('feature') feature: any;
  taxons: any = null;
  taxonsFilter: any = null;
  searchTerm$ = new Subject<any>();

  constructor( private layerS: LayerService, private globalS: GlobalsService ) { }

  ngOnInit() { 
    this.getTaxons(); 
    //callback de resultat
    this.searchTaxons(this.searchTerm$).subscribe(results => true);
  }

  getTaxons() {
    this.layerS.getTaxonsInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => {
                      this.taxons = res;
                      this.taxonsFilter = this.taxons;
                    });
  }

  getStatuts(statuts) {
  	return JSON.parse(statuts);
  }

  /* GET taxon whose name contains search term */
  searchTaxons(terms: Observable<any[]>) {
    return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          return this.searchItems(term);
        }),
        tap({
            next: (val) => {
              this.taxonsFilter = val;
            },
            error: (error) => {
              this.taxonsFilter = this.taxons;
              console.log('on error', error.message);
            }
          })
      );
  }

  searchItems(term): Observable<any[]> {
    return of(this.taxons.filter(item => this.globalS.searchInObject(term, item, ['cd_ref', 'nom_valide', 'date_min', 'date_max', 'statuts']) ));
  }
}
