import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as _ from 'lodash';

import { AppConfig } from '../../../shared/app.config';
import { Layer } from '../layers/layer';
import { RepartitionLayer } from '../layers/repartition-layer';
import { PressionLayer } from '../layers/pression-layer';
import { RichesseLayer } from '../layers/richesse-layer';
import { CartoService } from './carto.service';
import { TooltipDialog } from '../components/tooltip/tooltip.dialog'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface PERIODE {
  start: string,
  end: string
};

export interface SAISON {
  start: string,
  end: string
};

export interface PARAMS {
  scale: number,
  feature?: string,
  statuts?: Array<string>,
  periodes?: Array<PERIODE>,
  saisons?: Array<SAISON>
};

@Injectable()
export class LayerService {

  httpUrlBase: string;
  layers: Array<RepartitionLayer> = [];
  //parametres par defaut
  params: PARAMS = {
    scale: 32, //maille 5km
    statuts: [],
    periodes: [],
    saisons: []
  };
  $this = this;
  _scale: {id?: number, type: number, label?: string, priority?: number} = {type: 32, label: "Maille 5km"};

  constructor( 
  	private cartoS: CartoService,
  	private http: HttpClient,
    public dialog: MatDialog 
  ) {
  	this.httpUrlBase = AppConfig.URL_API_CARTO;

    this.cartoS.addClickFunction = {fct: this.displayFeatureInfo, this: this};
  }

  /***********************
  *
  *  Accesseurs
  *
  ************************/
  get scale() { return this._scale; }
  set scale(scale: {id?: number, type: number, label?: string, priority?: number}) { 
    this._scale = scale;
    this.params.scale = scale.type;
    this.reloadLayers();
  }

  get statuts() { return this.params.statuts; }
  set statuts(statuts: Array<string>) { 
    this.params.statuts = statuts;
    this.reloadLayers();
  }
  addStatut(statut: string) {
    if (this.params.statuts.indexOf(statut) === -1) {
      this.params.statuts.push(statut);
    };
    this.reloadLayers();
  }
  removeStatut(statut: string) {
    if ( this.params.statuts.indexOf(statut) !== -1) {
      this.params.statuts.splice(this.params.statuts.indexOf(statut),1);
    }
    this.reloadLayers();
  }

  get periodes() { return this.params.periodes; }
  set periodes(periodes: Array<PERIODE>) { 
    this.params.periodes = periodes;
    this.reloadLayers();
  }
  addPeriode(periode: PERIODE) {
    if ( this.params.periodes.indexOf(periode) === -1) {
      this.params.periodes.push(periode);
    };
    this.reloadLayers();
  }
  removePeriode(periode: PERIODE) {
    if ( this.indexOf(this.params.periodes, periode) !== -1) {
      this.params.periodes.splice(this.indexOf(this.params.periodes, periode),1);
    }
    this.reloadLayers();
  }

  get saisons() { return this.params.saisons; }
  set saisons(saisons: Array<SAISON>) { 
    this.params.saisons = saisons;
    this.reloadLayers();
  }
  addSaison(saison: SAISON) {
    if ( this.indexOf(this.params.saisons, saison) === -1) {
      this.params.saisons.push(saison);
    };
    this.reloadLayers();
  }
  removeSaison(saison: SAISON) {
    if ( this.indexOf(this.params.saisons, saison) !== -1) {
      this.params.saisons.splice(this.indexOf(this.params.saisons, saison),1);
    }
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

  public isInLegend(ID): boolean {
    let bool = false;
    this.layers.forEach((e) => {
      if ( e.ID == ID && e.olLayer.get('displayInLegend')) {
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
                        ID: layer.ID, 
                        title: layer.title, 
                        queryable: layer.queryable,
                        displayInLegend: layer.displayInLegend,
                        source: new VectorSource({format:this.cartoS.formatGeoJSON}), 
                        opacity: 0.8,
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
          .subscribe((geojson: Response) => {
            layer.state = "done";
            source.clear();
            source.addFeatures(this.cartoS.formatGeoJSON.readFeatures(geojson));
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


  //fonction d'ouverture de l'infobulle d'information de carte
  displayFeatureInfo = function($this, evt) {
    let pixel = evt.pixel;
    let coordinate = evt.coordinate;
    let items = {};
    $this.cartoS.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      if ( layer !== null && layer.get('queryable') ) {
        let id = layer.get('ID');
        if( !(id in items) ){ 
          items[id] = {
            'title': layer.get('title'),
            'ID': id,
            'features': []
          };
        }
        items[id]['features'].push(feature)
      }
    });


    if (Object.keys(items).length !== 0) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.data = Object.values(items); //on casse l'objet en tableau, on a plus besoin des idx
      dialogConfig.width = '1000px';
      dialogConfig.height = '500px';
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      const dialogRef = $this.dialog.open(TooltipDialog, dialogConfig);
    }

  }

  private indexOf(array: Array<any>, value:any): number {
    let result = -1;
    for (let i = 0; i < array.length ; i++) {
      if (_.isEqual(value, array[i])) {
        result = i;
      }
    }
    return result;
  }

  /**************
  *
  *  Lien API
  *
  ***************/

  /** GET taxon par ID (cd_nom) **/
  private getGeoJSON(layer, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url}`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getFeatureInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getObservateursInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/observateurs`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getJDDsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/datasets`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getCommunesInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/communes`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getCountsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/counts`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET taxon par ID (cd_nom) **/
  public getTaxonsInfo(layer, feature_id: string, params: any = this.params): Observable<any> {
    const url = `${this.httpUrlBase}${layer.url_info}/${feature_id}/taxons`;
    const sources = params;
    return this.http
      .post(url, sources, httpOptions)
      .pipe(
        retry(3)
      );
  }

  /** GET AvailablesScales **/
  public getAvailablesScales(): Observable<any> {
    const url = `${this.httpUrlBase}/scales`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        retry(3)
      );
  }

}
