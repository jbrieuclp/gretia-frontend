import { 
	Component, 
	OnInit, 
	ElementRef, 
	Output, 
	EventEmitter 
} from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';

import { Taxon } from '../../models/taxon.model';
import { TaxonRepository } from '../../models/repositories/taxon.repository';

@Component({
  selector: 'mtax-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  searchTerm$ = new Subject<any>();
  isOpen: boolean;
  isWaiting: boolean;
  autocomplete: Array<any>;
  textTaxon: string;
  @Output() 
  cdTaxonChange: EventEmitter<number> = new EventEmitter();

  constructor( private _tr: TaxonRepository, private location: Location ) { 
      this.isWaiting = false;
      this.textTaxon = '';

      //callback d'attente
      this.searchTerm$
        .subscribe(res => {
          this.autocomplete = []; 
          this.isWaiting = true; 
        });

      //callback de resultat
      this._tr.searchTaxons(this.searchTerm$)
        .subscribe(results => {
          this.isWaiting = false;
          this.autocomplete = results;
        });
  }

  ngOnInit() {
      this.autocomplete = [];
  }

  selectTaxon(val: any){
    this.textTaxon = val.nom_complet;
    this.location.go('/taxref/taxon/'+val.cd_nom);
    this.cdTaxonChange.emit(val.cd_nom);
  }
}