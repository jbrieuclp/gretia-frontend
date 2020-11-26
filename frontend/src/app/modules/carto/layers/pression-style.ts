import { BehaviorSubject } from 'rxjs';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { LayerStyle } from './layer-style';

export class PressionStyle extends LayerStyle {

  _min: BehaviorSubject<number> = new BehaviorSubject(null);
  get min() { return this._min.getValue(); }
  set min(min) { this._min.next(min); }

  _max: BehaviorSubject<number> = new BehaviorSubject(null);
  get max() { return this._max.getValue(); }
  set max(max) { this._max.next(max); }

  constructor() {
    super();
  }
  
  protected title = 'Représentation par nombre de donnée';

  protected display = ()=>{
    let content = [];
    content.unshift({
      "min": Math.ceil(this.max/2),
      "max": this.max,
      "color": "rgba(0, 0, 0, 1)",
      "label": "De "+Math.ceil(this.max/2)+" à "+this.max+" observations"
    })

    if ( this.max >= 2 ) {
      content.unshift({
        "min": Math.ceil(this.max/4),
        "max": Math.floor(this.max/2),
        "color": "rgba(75, 116, 47, 1)",
        "label": "De "+Math.ceil(this.max/4)+" à "+Math.floor(this.max/2)+" observations"
      })
    }

    if ( this.max >= 4 ) {
      content.unshift({
        "min": Math.ceil(this.max/8),
        "max": Math.floor(this.max/4),
        "color": "rgba(130, 202, 82, 1)",
        "label": "De "+Math.ceil(this.max/8)+" à "+Math.floor(this.max/4)+" observations"
      })
    }

    if ( this.max >= 8 ) {
      content.unshift({
        "min": Math.ceil(this.max/16),
        "max": Math.floor(this.max/8),
        "color": "rgba(175, 255, 122, 1)",
        "label": "De "+Math.ceil(this.max/16)+" à "+Math.floor(this.max/8)+" observations"
      })
    }

    if ( this.max >= 16 ) {
      content.unshift({
        "min": Math.ceil(this.min),
        "max": Math.floor(this.max/16),
        "color": "rgba(230, 255, 213, 1)",
        "label": "De "+Math.ceil(this.min)+" à "+Math.floor(this.max/16)+" observations"
      })
    }
    return content;
  };

  protected refreshDisplay(olLayer) {
    olLayer.getSource().on('change', (e)=>{
      e.target.forEachFeature(feature=>{
        if ( this.min === null || this.min === 0 || feature.get('nb_data') < this.min ) {
          this.min = feature.get('nb_data');
        } 

        if ( this.max === null || this.max === 0 || feature.get('nb_data') > this.max ) {
          this.max = feature.get('nb_data');
        }
      })

      if (e.target.getFeatures().length === 0) {
        this.min = 0;
        this.max = 0;
      }
    })
  }

  protected getText(feature, resolution){
    return resolution < 400 ? feature.get('nb_data').toString() : null;
  }

  public style_function = function(feature, resolution) {
    let defaultStroke = new Stroke({color: '#505050', width: 0.5});
    let display = this.display();
    for ( let i=0 ; i < display.length ; i++) {
      if ( feature.get('nb_data') >= display[i]['min'] && feature.get('nb_data') <= display[i]['max'] ) {

        var fill = new Fill({color: display[i]['color']});

        return [new Style({
          fill: fill,
          stroke: defaultStroke,
          image: new Circle({
            radius: 5,
            fill: fill
          }),
          text: this.createTextStyle(feature, resolution)
        })];
      }
    }

    return {};
  }.bind(this);

  public getLegende() {
    return this.display();
  }

};