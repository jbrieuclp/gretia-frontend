import { BehaviorSubject } from 'rxjs';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import { Layer } from './layer';
import { LayerStyle } from './layer-style';

export class RichesseStyle extends LayerStyle {

  _min: BehaviorSubject<number> = new BehaviorSubject(null);
  get min() { return this._min.getValue(); }
  set min(min) { this._min.next(min); }

  _max: BehaviorSubject<number> = new BehaviorSubject(null);
  get max() { return this._max.getValue(); }
  set max(max) { this._max.next(max); }

  constructor() {
    super();
  }

  protected title = 'Représentation par richesse taxonomique';
  
  protected display = ()=>{
    let content = [];
    content.unshift({
      "min": Math.ceil(this.max/2),
      "max": this.max,
      "color": "rgba(0, 15, 72, 1)",
      "label": "De "+Math.ceil(this.max/2)+" à "+this.max+" taxons"
    })

    if ( this.max >= 2 ) {
      content.unshift({
        "min": Math.ceil(this.max/4),
        "max": Math.floor(this.max/2),
        "color": "rgba(61, 98, 235, 1)",
        "label": "De "+Math.ceil(this.max/4)+" à "+Math.floor(this.max/2)+" taxons"
      })
    }

    if ( this.max >= 4 ) {
      content.unshift({
        "min": Math.ceil(this.max/8),
        "max": Math.floor(this.max/4),
        "color": "rgba(113, 191, 255, 1)",
        "label": "De "+Math.ceil(this.max/8)+" à "+Math.floor(this.max/4)+" taxons"
      })
    }

    if ( this.max >= 8 ) {
      content.unshift({
        "min": Math.ceil(this.min),
        "max": Math.floor(this.max/8),
        "color": "rgba(221, 244, 255, 1)",
        "label": "De "+Math.ceil(this.min)+" à "+Math.floor(this.max/8)+" taxons"
      })
    }
    return content;
  };

  protected refreshDisplay(olLayer) {
    olLayer.getSource().on('change', (e)=>{
      e.target.forEachFeature(feature=>{
        if ( this.min === null || this.min === 0 || feature.get('nb_taxon') < this.min ) {
          this.min = feature.get('nb_taxon');
        } 

        if ( this.max === null || this.min === 0 || feature.get('nb_taxon') > this.max ) {
          this.max = feature.get('nb_taxon');
        }
      })

      if (e.target.getFeatures().length === 0) {
        this.min = 0;
        this.max = 0;
      }
    })
  }

  protected getText(feature, resolution){
    return resolution < 400 ? feature.get('nb_taxon').toString() : null;
  }

  public style_function = function(feature, resolution) {
    let defaultStroke = new Stroke({color: '#505050', width: 0.5});
    let display = this.display();
    for ( let i=0 ; i < display.length ; i++) {
      if ( feature.get('nb_taxon') >= display[i]['min'] && feature.get('nb_taxon') <= display[i]['max'] ) {
        
        let fill = new Fill({color: display[i]['color']});

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
    let legende = this.display();

    return legende;
  }

};
