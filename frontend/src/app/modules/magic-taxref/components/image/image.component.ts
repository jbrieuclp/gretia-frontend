import { Component, OnInit, Input } from '@angular/core';

import { SparqlRepository } from '../../models/repositories';
import { TaxrefApiRepository } from '../../models/repositories';

@Component({
  selector: 'mtax-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers: [ SparqlRepository, TaxrefApiRepository ]
})
export class ImageComponent implements OnInit {

	_cd_ref: number;
	@Input()
  public set cd_ref(val: number) {
    this._cd_ref = val;
    this.images = [];
    this.getImages(this._cd_ref);
  }

  images: any;

  constructor(private _sparql: SparqlRepository, private _taxrefApi: TaxrefApiRepository) { }

  ngOnInit() { }

  getImages(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    this._sparql.getImages(cd_ref)
      .subscribe( (images: any) => {
        if ( typeof images.results !== 'undefined' &&typeof images.results.bindings !== 'undefined' && images.results.bindings.length ) {
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
