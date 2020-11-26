import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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
  waiting: boolean = true;

  constructor(
  	private importS: ImportService,
  	private fieldS: FieldService,
    public fileS: FileService,
    private renderer: Renderer2
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
                  tap(()=>this.waiting = false),
                  map(values=> {
                    return values
                            .filter(v=>!v.ok)
                            .sort((v1, v2)=>v1.value >= v2.value ? 1 : -1)
                            .map(taxon=>{return {taxon:taxon.value, matchs:[]} });
                  })
                )
                .subscribe(
                  (taxons:TaxrefMatch[])=>this.taxons = taxons,
                  error=>this.waiting = false
                );

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
    this.waiting = true;
    let data = {"taxons": this.taxons.map(taxon=>taxon.taxon)};
    this.importS.postTaxrefMatch(data)
                  .pipe(
                    tap(()=>this.waiting = false),
                    map(taxons=>
                      //si une seul proposition on la coche directement
                      taxons.map(taxon=>{
                        if (taxon.matchs.length === 1) {
                          taxon.match = taxon.matchs[0].nom_complet;
                        }
                        return taxon;
                      })
                    )
                  )
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

  getDifference(ref, term) {
    const element = this.renderer.createElement("div");
    const greenSpan = this.renderer.createElement("span");
    const redSpan = this.renderer.createElement("span");
    greenSpan.style.color = "green";
    redSpan.style.color = "red";

    let same = true;
    for (var i = 0; i < ref.length; i++) {
      if (ref[i] !== term[i] && same) {
        same = false;
      }

      if (same) {
        greenSpan.innerHTML += term[i];
      } else {
        redSpan.innerHTML += term[i];
      }
    }

    this.renderer.appendChild(element, greenSpan);
    this.renderer.appendChild(element, redSpan);
    return element.innerHTML;
  }
}
