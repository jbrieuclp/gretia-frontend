import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { Layer, LAYER_INTERFACE } from './layer';

const PRESSION_STYLE_LAYER = [{
                                "min": 1,
                                "max": 10,
                                "color": "rgba(230, 255, 213, 0.8)",
                                "label": "De 1 à 10 observations"
                            },
                            {
                                "min": 11,
                                "max": 100,
                                "color": "rgba(175, 255, 122, 0.8)",
                                "label": "De 11 à 100 observations"
                            },
                            {
                                "min": 101,
                                "max": 500,
                                "color": "rgba(130, 202, 82, 0.8)",
                                "label": "De 101 à 500 observations"
                            },
                            {
                                "min": 501,
                                "max": 2000,
                                "color": "rgba(75, 116, 47, 0.8)",
                                "label": "De 501 à 2000 observations"
                            },
                            {
                                "min": 2001,
                                "max": Infinity,
                                "color": "rgba(0, 0, 0, 0.8)",
                                "label": ">2000 observations"
                            }];

const PRESSION_STYLE_FUNCTION = function(feature, resolution) {
                        var defaultStroke = new Stroke({color: '#505050', width: 0.5});

                        for ( var i=0 ; i < PRESSION_STYLE_LAYER.length ; i++) {
                            var classe = PRESSION_STYLE_LAYER[i];
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
                title: `Pression d'inventaires`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                style: PRESSION_STYLE_FUNCTION,
                state: 'init',
                properties: properties
              };

    this.assign(layer);
  }

  getLegende() {
    let legende = new Array();

    return legende;
  }

}