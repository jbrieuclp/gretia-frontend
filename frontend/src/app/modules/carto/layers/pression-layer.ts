import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { Layer, LAYER_INTERFACE } from './layer';
import { PressionStyle } from './pression-style';

export class PressionLayer extends Layer {

  constructor(properties: any = {}) {
    super();
    this.create(properties);
  }

  private create(properties): void {
    let layer: LAYER_INTERFACE = {
                ID: 'PRESSION_LAYER',
                type: 'pression',
                url: `/layer/pression-inventaires.geojson`,
                url_info: `/layer/info`,
                title: `Pression d'inventaires`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                styles: {"PRESSION_STYLE": new PressionStyle()},
                displayStyle: "PRESSION_STYLE",
                state: 'init',
                properties: properties
              };

    this.assign(layer);
  }
}