import { Component, OnInit } from '@angular/core';

import { TaxonRepository } from '../../models/repositories/taxon.repository';

interface TaxrefMatch {
  taxon:string,
  matchs: any[],
  match?: any
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  providers: [TaxonRepository]
})
export class MatchComponent implements OnInit {

	saisie: string;
	taxons: TaxrefMatch[] = [];
	accordOpen: number = 0;
	toExport: boolean = false;

  constructor(private taxonR: TaxonRepository) { }

  ngOnInit() {
  }

  loadPropositions() {
  	this.accordOpen = 1;
    let data = {"taxons": this.saisie.split("\n").filter(value=>value.trim() != null && value.trim() != '')};
    this.taxonR.postTaxrefMatch(data)
                  .subscribe((result:TaxrefMatch[])=>this.taxons = result);
  }

  checkboxMatchChange(event, taxon): void {
    taxon.match = event.checked ? event.source.value : null;
  }

  get csv() {
  	let csv = ['"nom_initial";"cd_nom";"nom_complet";"cd_ref";"nom_valide"'];
  	this.taxons.forEach((taxon, i)=>{
  		let row = '';
  		if (taxon.match) {
  			row = this.csvEscape(taxon.taxon)+';'+taxon.match.cd_nom+';'+this.csvEscape(taxon.match.nom_complet)+';'+taxon.match.cd_ref+';'+this.csvEscape(taxon.match.nom_valide);
  		} else {
  			row = this.csvEscape(taxon.taxon)+';;;;';
  		}
  		csv.push(row);
  	});

  	return csv.join("\n");
  }

  private csvEscape(str: string) {
  	return '"'+str.replace('"', '""')+'"';
  }
}
