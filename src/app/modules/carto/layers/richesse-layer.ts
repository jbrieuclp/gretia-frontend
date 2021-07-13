import { Layer, LAYER_INTERFACE } from './layer';
import { RichesseStyle } from './richesse-style';

export class RichesseLayer extends Layer {

  constructor(properties: any = {}) {
    super();
    this.create(properties);
  }

  private create(properties): void {
    let layer: LAYER_INTERFACE = {
                ID: 'RICHESSE_LAYER',
                type: 'richesse',
                url: `/layer/richesse-taxonomique.geojson`,
                url_info: `/layer/info`,
                title: `Richesse taxonomique`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                styles: {"RICHESSE_STYLE": new RichesseStyle()},
                displayStyle: "RICHESSE_STYLE",
                state: 'init',
                properties: properties,
              };

    this.assign(layer);
  }
}