import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import { AppConfig } from '../../../shared/app.config';
import { Layer } from '../entities/layer';
import { RepartitionLayer } from '../entities/repartition-layer';
import { PressionLayer } from '../entities/pression-layer';
import { RichesseLayer } from '../entities/richesse-layer';
import { CartoService } from './carto.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface PARAMS {
  scale: number
};

@Injectable()
export class LayerService {

  httpUrlBase: string;
  layers: Array<RepartitionLayer> = [];
  params: PARAMS = {
    scale: 32
  };

  constructor( 
  	private cartoS: CartoService,
  	private http: HttpClient 
  ) {
  	this.httpUrlBase = AppConfig.URL_API_CARTO;
  }

  /***********************
  *
  *  Accesseurs
  *
  ************************/
  get scale() { return this.params.scale; }
  set scale(scale: number) { 
    this.params.scale = scale;
    this.reloadLayers();
  }


  /***********************
  *
  *  Fonctions publiques
  *
  ************************/
  public addRepartitionLayer(taxon): void {
    let ID = taxon.cd_ref;
    if ( this.layerExist(ID) ) {
      this.reloadLayer(ID, true);
      return;
    }
    let layer = new RepartitionLayer(taxon);
    this.addLayer(layer);
  }

  public addIndicateurLayer(ID): void {
    if ( this.layerExist(ID) ) {
      this.reloadLayer(ID, true);
      return;
    }

    if ( ID == 'PRESSION_LAYER') {
      let layer = new PressionLayer();
      this.addLayer(layer);
      return;
    } else if ( ID == 'RICHESSE_LAYER') {
      let layer = new RichesseLayer();
      this.addLayer(layer);
      return;
    }
  }

  public getLegende(layer): void {
    return layer.getLegende();
  }

  public removeLayer(ID) {
    let layer = this.getLayer(ID);
    this.cartoS.map.removeLayer(layer.olLayer);
    this.layers = this.layers.filter((layer) => {layer.ID !== ID});
  }


  /***********************
  *
  *  Fonctions de service
  *
  ************************/
  public layerExist(ID): boolean {
    let bool = false;
    this.layers.forEach((e) => {
      if ( e.ID == ID ) {
        bool = true;
      }
    })
    return bool;
  }

  public isVisible(ID): boolean {
    let bool = false;
    this.layers.forEach((e) => {
      if ( e.ID == ID && e.olLayer.getVisible()) {
        bool = true;
      }
    })
    return bool;
  }

  public getLayer(ID) {
    let layer = null;
    this.layers.forEach((e) => {
      if ( e.ID == ID ) {
        layer = e;
      }
    })
    return layer;
  }

  protected addLayer(layer): void {
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

  protected loadLayer(layer: Layer) {
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
    let layer:Layer = this.getLayer(ID);
    this.loadLayer(layer);
    if (visibility !== null) {
      layer.olLayer.setVisible(visibility);
    }
  }

  protected reloadLayers() {
    this.layers.forEach((e) => {
      if ( e.olLayer.getVisible() ) {
        this.loadLayer(e);
      }
    })
  }




  /**************
  *
  *  Lien API
  *
  ***************/

  /** GET taxon par ID (cd_nom) **/
  private getGeoJSON(layer, params: any = this.params): Observable<any> {
    const taxonUrl = `${this.httpUrlBase}${layer.url}`;
    const sources = params;
    return this.http
      .post(taxonUrl, sources, httpOptions);
  }

  /** GET AvailablesScales **/
  public getAvailablesScales(): Observable<any> {
    const taxonUrl = `${this.httpUrlBase}/scales`;
    return this.http
      .get(taxonUrl, httpOptions);
  }

}
