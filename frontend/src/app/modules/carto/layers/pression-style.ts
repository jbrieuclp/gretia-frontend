import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';

export class PressionStyle {

   protected title = 'Représentation par nombre de donnée';
  
  protected _display =  [{
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
    }
  ];

  public style_function = function(feature, resolution) {
    var defaultStroke = new Stroke({color: '#505050', width: 0.5});

    for ( var i=0 ; i < this._display.length ; i++) {
      var classe = this._display[i];
      var min = classe['min'];
      var max = classe['max'];
      var rgba = classe['color'];
      if ( feature.get('nb_data') >= min && feature.get('nb_data') <= max ) {

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
  }.bind(this);

  public getLegende() {
    return this._display;
  }

};