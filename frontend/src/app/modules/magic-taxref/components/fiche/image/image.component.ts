import { Component, OnInit, Input } from '@angular/core';
import { map, tap, filter } from 'rxjs/operators';

import { FicheService } from '../fiche.service';
import { SparqlRepository } from '../../../models/repositories';
import { TaxrefApiRepository } from '../../../models/repositories';

@Component({
  selector: 'app-magictaxref-fiche-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [ SparqlRepository, TaxrefApiRepository ]
})
export class ImageComponent implements OnInit {

  images: any;

  constructor(
    private _sparql: SparqlRepository, 
    private _taxrefApi: TaxrefApiRepository,
    private ficheS: FicheService,
  ) { }

  ngOnInit() { 
    this.ficheS.cdRef
      .pipe(
        tap(() => this.images = []),
        filter(cdRef => cdRef !== undefined),
      )
      .subscribe((cdRef) => this.getImages(cdRef));
  }

  getImages(cd_ref: number) {
    this._sparql.getImages(cd_ref)
      .subscribe( (images: any) => {
        if ( typeof images.results !== 'undefined' && typeof images.results.bindings !== 'undefined' && images.results.bindings.length ) {
          for (var i = 0; i < images.results.bindings.length ; i++) {
            let image = images.results.bindings[i];
            if (typeof image.image !== 'undefined' && typeof image.image.type !== 'undefined' && image.image.type == 'uri') {
              this.images.push(image.image.value);
            }
          }
        }
      });

    this._taxrefApi.getMedia(cd_ref)
      .subscribe( (medias: any) => {
        if ( typeof medias._embedded !== 'undefined' && typeof medias._embedded.media !== 'undefined' && medias._embedded.media.length ) {
          for (var i = 0; i < medias._embedded.media.length ; i++) {
            let media = medias._embedded.media[i];
            if ( typeof media._links !== 'undefined' && typeof media._links.thumbnailFile !== 'undefined' ) {
              this.images.push(media._links.thumbnailFile.href);
            }
          }          
        } 
      });
  }

}
