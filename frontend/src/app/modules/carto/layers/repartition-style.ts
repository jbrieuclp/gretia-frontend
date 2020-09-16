import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';

export class RepartitionStyle {

   protected title = 'Représentation par année des données';
  
  protected _display =  {
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

  public style_function = function(feature, resolution){
    let defaultStroke = new Stroke({color: '#505050', width: 0.5});
    let rgba = this._display['non_traitee']["color"];

    if ( feature.get('validation') == 0) {
      rgba = this._display['non_traitee']["color"];
    } else if ( feature.get('annee_max') >= 2000) {
      rgba = this._display['recente']["color"];
    } else if ( feature.get('annee_max') >= 1950 ) {
      rgba = this._display['ancienne']["color"];
    } else {
      rgba = this._display['historique']["color"];
    }

    return [new Style({
              fill: new Fill({color: rgba}),
              stroke: defaultStroke,
            })];
  }.bind(this);

  public getLegende() {
    let legende = new Array();
    legende.push(this._display.recente);
    legende.push(this._display.ancienne);
    legende.push(this._display.historique);
    legende.push(this._display.non_traitee);
    return legende;
  }

};