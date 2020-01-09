import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { Layer, LAYER_INTERFACE } from './layer';

const RICHESSE_STYLE_LAYER = [
                                {
                                    "min": 1,
                                    "max": 15,
                                    "color": "rgba(221, 244, 255, 0.5)",
                                    "label": "De 1 à 15 taxons"
                                },
                                {
                                    "min": 16,
                                    "max": 40,
                                    "color": "rgba(113, 191, 255, 0.8)",
                                    "label": "De 16 à 40 taxons"
                                },
                                {
                                    "min": 41,
                                    "max": 80,
                                    "color": "rgba(61, 98, 235, 0.8)",
                                    "label": "De 41 à 80 taxons"
                                },
                                {
                                    "min": 81,
                                    "max": Infinity,
                                    "color": "rgba(0, 15, 72, 0.8)",
                                    "label": ">80 taxons"
                                }
                                
                            ];

const RICHESSE_STYLE_FUNCTION = function(feature, resolution) {
                        var defaultStroke = new Stroke({color: '#505050', width: 0.5});

                        for ( var i=0 ; i < RICHESSE_STYLE_LAYER.length ; i++) {
                            var classe = RICHESSE_STYLE_LAYER[i];
                            var min = classe['min'];
                            var max = classe['max'];
                            var rgba = classe['color'];
                            if ( feature.get('total') >= min && feature.get('total') <= max ) {

                                var fill = new Fill({color: rgba});

                                return [new Style({
                                    fill: fill,
                                    stroke: defaultStroke,
                                    image: new Circle({
                                        radius: 5,
                                        fill: fill
                                    })
                                })];
                            }
                        }

                        return {};
                    };

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
                style: RICHESSE_STYLE_FUNCTION,
                state: 'init',
                properties: properties,
              };

    this.assign(layer);
  }

  getLegende() {
    let legende = RICHESSE_STYLE_LAYER;

    return legende;
  }

}