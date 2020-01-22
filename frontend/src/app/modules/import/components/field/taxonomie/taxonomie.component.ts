import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';
import { FieldService } from '../field.service';

interface TaxrefMatch {
  taxon:string,
  matchs: any[],
  match?: string
}

@Component({
  selector: 'app-taxonomie',
  templateUrl: './taxonomie.component.html',
  styleUrls: ['./taxonomie.component.scss'],
  providers: [FileService]
})
export class TaxonomieComponent implements OnInit, OnDestroy {

  fichier: any;
  field: any;
  error: any;
  taxons: TaxrefMatch[] = [];

  constructor(
  	private importS: ImportService,
  	private fieldS: FieldService,
    public fileS: FileService
  ) { }

  ngOnInit() {
    this.fileS.file
          .subscribe(fichier=>{
            this.fichier = fichier;
            this.getTaxonomicField()
          });

    this.fieldS.values
                .pipe(
                  tap(()=>this.taxons = []),
                  map(values=> {
                    return values
                            .filter(v=>!v.ok)
                            .sort((v1, v2)=>v1.value >= v2.value ? 1 : -1)
                            .map(taxon=>{return {taxon:taxon.value, matchs:[]} });
                  })
                )
                .subscribe((taxons:TaxrefMatch[])=>this.taxons = taxons);

    this.fieldS.field.subscribe(field=>this.field = field);
  }


  /**
  *  Retourne le champ correspondant au FSD __OBSERVERS__
  */
  getTaxonomicField() {
    this.importS.getFieldByFSD(this.fichier.id, 'nom_complet')
                    .subscribe(
                      field => this.fieldS.field = field, 
                      error => this.error = error
                    );
  }

  loadPropositions() {
    let data = {"taxons": this.taxons.map(taxon=>taxon.taxon)};
    this.importS.postTaxrefMatch(data)
                  .subscribe((result:TaxrefMatch[])=>this.taxons = result);
  }

  checkboxMatchChange(event, taxon): void {
    taxon.match = event.checked ? event.source.value : null;
  }



  saveMatchs() {
    const data = this.taxons
                      .filter(taxon=>taxon.match != null)
                      .map(taxon=>{return {'old': taxon.taxon, 'new': taxon.match}});

    this.importS.updateFieldValues(this.field.id, data)
                  .subscribe(
                    result=>this.fieldS.loadFieldValues(this.field.id),
                    error=>console.log("error")
                  );
  }

  ngOnDestroy() {
    this.fieldS.reset();
  }
}
