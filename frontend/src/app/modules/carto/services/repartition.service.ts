import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { debounceTime, map, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Style from 'ol/style/Style';

import { AppConfig } from '../../../shared/app.config';
import { CartoService } from './carto.service';
import { LayerService } from './layer.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

const STYLE_LAYER = {
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

@Injectable()
export class RepartitionService extends LayerService {

  httpUrlBase: string;

  layers: any = {};

  constructor(
    private cartoS: CartoService,
    private http: HttpClient
  ) {
    super(cartoS);
    this.httpUrlBase = AppConfig.URL_API_CARTO;
  }

  /** GET taxon par ID (cd_nom) **/
  getGeoJSON(cd_ref: number = 189435): Observable<any> {
    const taxonUrl = `${this.httpUrlBase}/repartition/${cd_ref}.geojson`;
    const sources = {};
    return this.http
      .post(taxonUrl, sources, httpOptions);
  }


  addLayer(cd_ref) {
    let source = new VectorSource({format:this.cartoS.formatGeoJSON});
    let olLayer = new VectorLayer({
                        title: "Repartition de ....", 
                        queryable: true,
                        displayInLegend: true,
                        source: source, 
                        style: function(feature, resolution){
                          let defaultStroke = new Stroke({color: '#505050', width: 0.5});
                          let rgba = STYLE_LAYER['non_traitee']["color"];

                          if ( feature.get('validation') == 0) {
                              rgba = STYLE_LAYER['non_traitee']["color"];
                          } else if ( feature.get('annee_max') >= 2000) {
                              rgba = STYLE_LAYER['recente']["color"];
                          } else if ( feature.get('annee_max') >= 1950 ) {
                              rgba = STYLE_LAYER['ancienne']["color"];
                          } else {
                              rgba = STYLE_LAYER['historique']["color"];
                          }

                          return [new Style({
                                    fill: new Fill({color: rgba}),
                                    stroke: defaultStroke,
                                  })];
                        },
                        visible: true
                  });

    this.cartoS.map.addLayer(olLayer);
    this.layers[cd_ref] = olLayer;
    this.getGeoJSON(cd_ref)
          .subscribe((geosjon: Response) => {
            source.clear();
            source.addFeatures(this.cartoS.formatGeoJSON.readFeatures(geosjon));
          });
  }
}
