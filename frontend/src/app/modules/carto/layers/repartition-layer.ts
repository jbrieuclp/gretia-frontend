import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { Layer, LAYER_INTERFACE } from './layer';
import { RepartitionInfoComponent } from './template/repartition/repartition-info.component';

const REPART_STYLE_LAYER = {
                      "historique": {
                          "color": "rgba(88, 41, 0, 0.8)",
                          "label": "Données historiques (<1950)"
                      },
                      "ancienne": {
                          "color": "rgba(166, 123, 44, 0.8)",
                          "label": "Données anciennes (≥1950 - <2000)"
                      },
                      "recente": {
                          "color": "rgba(130, 202, 82, 0.8)",
                          "label": "Données récentes (≥2000)"
                      },
                      "non_traitee": {
                          "color": "rgba(200, 200, 200, 0.8)",
                          "label": "Données en attente de validation"
                      }
                  };

const REPART_STYLE_FUNCTION = function(feature, resolution){
                          let defaultStroke = new Stroke({color: '#505050', width: 0.5});
                          let rgba = REPART_STYLE_LAYER['non_traitee']["color"];

                          if ( feature.get('validation') == 0) {
                              rgba = REPART_STYLE_LAYER['non_traitee']["color"];
                          } else if ( feature.get('annee_max') >= 2000) {
                              rgba = REPART_STYLE_LAYER['recente']["color"];
                          } else if ( feature.get('annee_max') >= 1950 ) {
                              rgba = REPART_STYLE_LAYER['ancienne']["color"];
                          } else {
                              rgba = REPART_STYLE_LAYER['historique']["color"];
                          }

                          return [new Style({
                                    fill: new Fill({color: rgba}),
                                    stroke: defaultStroke,
                                  })];
                        };

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
                url_info: `/layer-info/repartition/${taxon.cd_ref}`,
                title: `Repartition de ${taxon.nom_valide}`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                style: REPART_STYLE_FUNCTION,
                state: 'init',
                properties: {taxon: taxon},
                template_component: RepartitionInfoComponent
              };

    this.assign(layer);
  }

  getLegende() {
    let legende = new Array();
    legende.push(REPART_STYLE_LAYER.recente);
    legende.push(REPART_STYLE_LAYER.ancienne);
    legende.push(REPART_STYLE_LAYER.historique);
    legende.push(REPART_STYLE_LAYER.non_traitee);
    return legende;
  }

}