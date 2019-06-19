import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { AppConfig } from '../../../shared/app.config';
import { CartoService } from './carto.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface LAYER {
  ID: string,
  url: string,
  title: string,
  queryable: boolean, 
  visible: boolean, 
  displayInLegend: boolean
  style?: any,
  state: 'init'|'load'|'done'|'error',
  olLayer?: VectorLayer,
  properties?: any
};

@Injectable()
export class LayerService {

  constructor( 
  	protected cartoS: CartoService,
  	protected http: HttpClient 
  ) {
  	this.httpUrlBase = AppConfig.URL_API_CARTO;
  }

  httpUrlBase: string;
  layers: Array<LAYER> = [];

  /** GET taxon par ID (cd_nom) **/
  // getGeoJSON(cd_ref: number = 189435): Observable<any> {
  //   const taxonUrl = `${this.httpUrlBase}/repartition/${cd_ref}.geojson`;
  //   const sources = {};
  //   return this.http
  //     .post(taxonUrl, sources, httpOptions);
  // }

  protected isLoad(ID): boolean {
    let bool = false;
    this.layers.forEach((e) => {
      if ( e.ID == ID ) {
        bool = true;
      }
    })
    return bool;
  }

  protected getLayer(ID) {
    let layer = null;
    this.layers.forEach((e) => {
      if ( e.ID == ID ) {
        layer = e;
      }
    })
    return layer;
  }

  protected addLayer(layer): void {

    if ( this.isLoad(layer.ID) ) {
      this.reloadLayer(layer.ID, true);
      return;
    } 
    let olLayer = new VectorLayer({
                        title: layer.title, 
                        queryable: layer.queryable,
                        displayInLegend: layer.displayInLegend,
                        source: new VectorSource({format:this.cartoS.formatGeoJSON}), 
                        style: layer.style,
                        visible: layer.visible
                  });

    this.cartoS.map.addLayer(olLayer);
    layer.olLayer = olLayer;

    this.layers.push(layer);
    this.loadLayer(layer);
  }

  protected loadLayer(layer: LAYER) {
    let source = layer.olLayer.getSource();
    layer.state = "load";
    this.getGeoJSON(layer)
          .subscribe((geosjon: Response) => {
            layer.state = "done";
            source.clear();
            source.addFeatures(this.cartoS.formatGeoJSON.readFeatures(geosjon));
          });
  }

  protected reloadLayer(ID, visibility:boolean = null) {
    let layer:LAYER = this.getLayer(ID);
    this.loadLayer(layer);
    if (visibility !== null) {
      layer.olLayer.setVisible(visibility);
    }
  }

  /** GET taxon par ID (cd_nom) **/
  private getGeoJSON(layer, params: any = {}): Observable<any> {
    const taxonUrl = `${this.httpUrlBase}${layer.url}`;
    const sources = params;
    return this.http
      .post(taxonUrl, sources, httpOptions);
  }

}
