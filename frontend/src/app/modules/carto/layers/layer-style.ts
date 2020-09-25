import { Type } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Fill, Stroke, Text } from 'ol/style';
import { Layer } from './layer';

export abstract class LayerStyle {

  layer: BehaviorSubject<Layer> = new BehaviorSubject(null);

	constructor() {
    this.layer.asObservable()
      .pipe(
        filter(layer=>layer !== null),
        switchMap(layer=>layer.olLayerAsOservable.pipe(filter(olLayer=>olLayer!==null)))
      )
      .subscribe(layer=>this.refreshDisplay(layer));
  }

  protected refreshDisplay(olLayer){}

  protected getText(feature, resolution){return null;}

  protected createTextStyle = function (feature, resolution) {
    return new Text({
      text: this.getText(feature, resolution),
      fill: new Fill({color: '#555555'}),
      stroke: new Stroke({color: '#ffffff', width: 3}),
    });
  }

}