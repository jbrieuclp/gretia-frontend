import { Component, OnInit, Input, ViewEncapsulation, IterableDiffers, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { TaxrefApiService } from '../../../../../shared/services/taxref-api.service'
import { LayerService } from '../../../services/layer.service';

@Component({
  selector: 'app-carto-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImagesComponent implements OnInit {

  images: any;
  iterableDiffer;

  constructor(
    private taxrefApi: TaxrefApiService, 
    private layerS: LayerService, 
    private _iterableDiffers: IterableDiffers,
    public dialog: MatDialog
  ) { 
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() { 
    this.images = [];
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.layerS.layers);
    if (changes) {
      this.images = [];
      for (let layer of this.layerS.layers) {
        if (layer.properties.taxon !== undefined && layer.olLayer.getVisible()) {
          let cd_ref = layer.properties.taxon.cd_ref;
          this.getImages(cd_ref);
        }
      }
    }
  }

  openDialog(image): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {image: image};
    dialogConfig.maxHeight = '80%';
    dialogConfig.maxWidth = '80%';

    const dialogRef = this.dialog.open(ImageDialog, dialogConfig);
  }

  getImages(cd_ref: number) {
    if ( typeof(cd_ref) === 'undefined' )
      return;

    // this._sparql.getImages(cd_ref)
    //   .subscribe( (images: any) => {
    //     if ( typeof images.results !== 'undefined' &&typeof images.results.bindings !== 'undefined' && images.results.bindings.length ) {
    //       for (var i = 0; i < images.results.bindings.length ; i++) {
    //         let image = images.results.bindings[i];
    //         if (typeof image.image !== 'undefined' && typeof image.image.type !== 'undefined' && image.image.type == 'uri') {
    //           this.images.push(image.image.value);
    //         }
    //       }
    //     }
    //   });

    this.taxrefApi.getMedia(cd_ref)
      .subscribe( (medias: any) => {
        if ( typeof medias._embedded !== 'undefined' && typeof medias._embedded.media !== 'undefined' && medias._embedded.media.length ) {
          for (var i = 0; i < medias._embedded.media.length ; i++) {
            let media = medias._embedded.media[i];
            if ( typeof media._links !== 'undefined' && typeof media._links.thumbnailFile !== 'undefined' ) {
              this.images.push({media: media._links.thumbnailFile.href, title: 'INPN : '+media.copyright+' ('+media.licence+')'});
              this.images = this.shuffle(this.images);
            }
          }          
        } 
      });
  }

  private shuffle(array) {
    let return_array = [];
    while ( array.length !== 0 ) {
      let randomIndex = Math.floor(Math.random() * array.length); //index aleatoire sur le nombre de ligne du tableau
      return_array.push(array[randomIndex]);
      array.splice(randomIndex, 1);
    }
    return return_array;
  }

}



/**********
* DIALOG
**********/
@Component({
  selector: 'app-carto-image-dialog',
  template: '<img [src]="image.media" [alt]="image.title">'
})
export class ImageDialog implements OnInit {

  image: any;
  constructor (
    public dialogRef: MatDialogRef<ImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() { 
    this.image = this.data.image;
    console.log(this.image);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}