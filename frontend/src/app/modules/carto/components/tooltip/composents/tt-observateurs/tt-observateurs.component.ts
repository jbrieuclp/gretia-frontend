import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { LayerService } from '../../../../services/layer.service';
import { GlobalsService } from '../../../../../../shared/services/globals.service';

@Component({
  selector: 'app-carto-tooltip-content-observateurs',
  templateUrl: './tt-observateurs.component.html',
  styleUrls: ['../tt-taxons.component.scss'],
  providers: [GlobalsService]
})
export class TooltipObservateursComponent implements OnInit {

	@Input('layer') layer: any;
	@Input('feature') feature: any;
  observateurs: any = null;
  observateursFilter: any = null;
  searchTerm$ = new Subject<any>();

  constructor(private layerS: LayerService, private globalS: GlobalsService ) { }

  ngOnInit() {
    this.getObservateurs();
    //callback de resultat
    this.searchObservateurs(this.searchTerm$).subscribe(results => true);
  }

  getObservateurs() {
    this.layerS.getObservateursInfo(this.layer, this.feature.get('id_area'))
                    .subscribe(res => {
                      this.observateurs = res;
                      this.observateursFilter = res;
                    });
  }

  /* GET observateurs whose name contains search term */
  searchObservateurs(terms: Observable<any[]>) {
    return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          return this.searchItems(term);
        }),
        tap({
            next: (val) => {
              this.observateursFilter = val;
            },
            error: (error) => {
              this.observateursFilter = this.observateurs;
              console.log('on error', error.message);
            }
          })
      );
  }

  searchItems(term): Observable<any[]> {
    return of(this.observateurs.filter(item => this.globalS.searchInObject(term, item, ['nom', 'prenom']) ));
  }
}
