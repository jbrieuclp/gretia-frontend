import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';

export class RichesseStyle {

  protected title = 'Représentation par richesse taxonomique';
  
  protected _display =  [
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

  public style_function = function(feature, resolution) {
    var defaultStroke = new Stroke({color: '#505050', width: 0.5});

    for ( var i=0 ; i < this._display.length ; i++) {
      var classe = this._display[i];
      var min = classe['min'];
      var max = classe['max'];
      var rgba = classe['color'];
      if ( feature.get('nb_taxon') >= min && feature.get('nb_taxon') <= max ) {

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
    let legende = this._display;

    return legende;
  }

};
