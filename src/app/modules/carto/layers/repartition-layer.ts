import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { Layer, LAYER_INTERFACE } from './layer';
import { RepartitionStyle } from './repartition-style';
import { RichesseStyle } from './richesse-style';
import { PressionStyle } from './pression-style';

export interface REPARTITION_LAYER_INTERFACE extends LAYER_INTERFACE {
  properties: {taxon:{cd_ref: number, nom_valide: string, nom_vern?: string}}
};

export class RepartitionLayer extends Layer {

  constructor(taxon) {
    super();
    this.create(taxon);
  }

  private create(taxon): void {
    let layer: REPARTITION_LAYER_INTERFACE = {
                ID: taxon.cd_ref,
                type: 'repartition',
                url: `/layer/repartition/${taxon.cd_ref}.geojson`,
                url_info: `/layer/info/${taxon.cd_ref}`,
                title: `Repartition de ${taxon.nom_valide}`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                styles: {
                  "REPARTITION_STYLE": new RepartitionStyle(), 
                  "PRESSION_STYLE": new PressionStyle(),
                  "RICHESSE_STYLE": new RichesseStyle()
                },
                displayStyle: "REPARTITION_STYLE",
                state: 'init',
                properties: {taxon: taxon},
              };

    this.assign(layer);
  }
}