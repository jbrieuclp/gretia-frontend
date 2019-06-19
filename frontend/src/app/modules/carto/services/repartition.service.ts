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
import { LayerService, LAYER } from './layer.service';


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

export interface REPARTITION_LAYER extends LAYER {
  properties: {taxon:{cd_ref: number, nom_valide: string, nom_vern?: string}}
};

@Injectable()
export class RepartitionService extends LayerService {


  constructor(
    protected cartoS: CartoService,
    protected http: HttpClient
  ) {
    super(cartoS, http);
  }

  setLayer(taxon): void {

    let layer: REPARTITION_LAYER = {
                ID: taxon.cd_ref,
                url: `/repartition/${taxon.cd_ref}.geojson`,
                title: `Repartition de ${taxon.nom_valide}`,
                queryable: true, 
                visible: true, 
                displayInLegend: true,
                style: REPART_STYLE_FUNCTION,
                state: 'init',
                properties: {taxon: taxon}
              };

    this.addLayer(layer);
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
