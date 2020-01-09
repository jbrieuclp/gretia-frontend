import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { LayerService } from '../../../../services/layer.service';
import { GlobalsService } from '../../../../../../shared/services/globals.service';

@Component({
  selector: 'app-carto-tooltip-content-communes',
  templateUrl: './tt-communes.component.html',
  styleUrls: ['../tt-composent.component.scss'],
  providers: [GlobalsService]
})
export class TooltipCommunesComponent implements OnInit {

	@Input('layer') layer: any;
	@Input('feature') feature: any;
  communes: any = null;
  communesFilter: any = null;
  searchTerm$ = new Subject<any>();

  constructor(private layerS: LayerService, private globalS: GlobalsService) { }

  ngOnInit() {
    this.getCommunes();
    //callback de resultat
    this.searchCommunes(this.searchTerm$).subscribe(results => true);
  }

  getCommunes() {
    this.layerS.getCommunesInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => {
                      this.communes = res;
                      this.communesFilter = res;
                    });
  }

  /* GET commune whose name contains search term */
  searchCommunes(terms: Observable<any[]>) {
    return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          return this.searchItems(term);
        }),
        tap({
            next: (val) => {
              this.communesFilter = val;
            },
            error: (error) => {
              this.communesFilter = this.communes;
              console.log('on error', error.message);
            }
          })
      );
  }

  searchItems(term): Observable<any[]> {
    return of(this.communes.filter(item => this.globalS.searchInObject(term, item, ['name', 'insee']) ));
  }
}
