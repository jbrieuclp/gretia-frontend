import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { LayerStyle } from './layer-style';

export class RepartitionStyle extends LayerStyle {

  constructor() {
    super();
  }
  
  protected title = 'Représentation par année des données';
  
  protected display =  {
    "historique": {
      "color": "rgba(88, 41, 0, 1)",
      "label": "Données historiques (<1950)"
    },
    "ancienne": {
      "color": "rgba(166, 123, 44, 1)",
      "label": "Données anciennes (≥1950 - <2000)"
    },
    "recente": {
      "color": "rgba(130, 202, 82, 1)",
      "label": "Données récentes (≥2000)"
    },
    "non_traitee": {
      "color": "rgba(200, 200, 200, 1)",
      "label": "Données en attente de validation"
    }
  };

  public style_function = function(feature, resolution){
    let defaultStroke = new Stroke({color: '#505050', width: 0.5});
    let rgba = this.display['non_traitee']["color"];

    if ( feature.get('validation') == 0) {
      rgba = this.display['non_traitee']["color"];
    } else if ( feature.get('annee_max') >= 2000) {
      rgba = this.display['recente']["color"];
    } else if ( feature.get('annee_max') >= 1950 ) {
      rgba = this.display['ancienne']["color"];
    } else {
      rgba = this.display['historique']["color"];
    }

    return [new Style({
              fill: new Fill({color: rgba}),
              stroke: defaultStroke,
            })];
  }.bind(this);

  public getLegende() {
    let legende = new Array();
    legende.push(this.display.recente);
    legende.push(this.display.ancienne);
    legende.push(this.display.historique);
    legende.push(this.display.non_traitee);
    return legende;
  }

};