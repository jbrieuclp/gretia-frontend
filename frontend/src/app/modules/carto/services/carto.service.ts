import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TooltipDialog } from '../components/tooltip/tooltip.dialog'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select';
import * as proj from 'ol/proj';
import * as extent from 'ol/extent';
import * as format from 'ol/format';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';

import { layers } from './layers.config';

@Injectable()
export class CartoService {

  private _map: Map;
  private _epsg3857 = new proj.get('EPSG:3857');
  private _formatGeoJSON = new format.GeoJSON({projection: this._epsg3857});
  private _vectorSource = new VectorSource({format:this._formatGeoJSON});
  private _resolutions = new Array(14); 
  private _matrixIds = new Array(14);
  private _key_ign = 'v0bxp1xur57ztiai9djszgjw';
  private _mapview: ElementRef;

  constructor(public dialog: MatDialog) { }

  get map() { return this._map; }
  set map(map: Map) { this._map = map; }

  get mapview() { return this._mapview; }
  set mapview(mapview: ElementRef) { this._mapview = mapview; }

  get epsg3857() { return this._epsg3857; }
  get formatGeoJSON() { return this._formatGeoJSON; }
  get vectorSource() { return this._formatGeoJSON; }
  get resolutions() { return this._resolutions; }
  get matrixIds() { return this._matrixIds; }
  get key_ign() { return this._key_ign; }

  setResolution() {
    let size = extent.getWidth(this.epsg3857.getExtent()) / 256;
    for (var z = 0; z < 22; ++z) {
        this._resolutions[z] = size / Math.pow(2, z);
        this._matrixIds[z] = z;
    }
  }

  public initMap(): Map {
    let map = new Map({
      view: new View({
        center: new proj.transform([-0.18, 48.08], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7,
        projection: this._epsg3857, 
      })
    });

    layers.forEach(function(group) {
      map.addLayer(group);
    });

    this.setResolution();

    this.map = map;

    //configuration des elements de la map (ajout de controls)
    this.addQueryControl();

    return this.map;
  }

  public resizeMap(width, height) {
    this.map.setSize([width, height]);
  }

  addLayer(layer) {
    this.map.addLayer(layer);
  }

  private addQueryControl() {

    let selectStyle = (function() {

      let style = [new Style({
          fill: new Fill({color: 'rgba(166, 123, 44, 0.8)'}),
          stroke: new Stroke({color: '#024CD6', width: 2})
      })];

      return function(feature, resolution) {
          if ( feature.getStyle() ) {
              //si jamais la feature possède un style fill on remplace le style par defaut
              style = [new Style({
                  fill: feature.getStyle().getFill(),
                  stroke: new Stroke({color: '#024CD6', width: 2})
              })];
          }

          return style;
      };

    })();

    //action de cliquer sur objet pour obtenir des informations
    let selectSingleClick = new Select({
      style: selectStyle,
      multi: true,
      layers: function(layer) {
          return layer.get('queryable') == true;
      }
    });
    this.map.addInteraction(selectSingleClick);

    let $this = this;

    this.map.on('click', function(evt) {
      $this.displayFeatureInfo(evt.pixel, evt.coordinate);
    });


  }


  //fonction d'ouverture de l'infobulle d'information de carte
  displayFeatureInfo(pixel, coordinate) {
    let features = {};
    this.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      if ( layer !== null && layer.get('queryable') ) {
        var title = layer.get('title');
        var id = title.replace(/ /g, '_');
        if( !(id in features) ){ 
          features[id] = {
            'name': title,
            'id': id,
            'data': []
          };
        }
        features[id]['data'].push(feature)
      }
    });


    if (Object.keys(features).length !== 0) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.data = features;
      dialogConfig.width = '600px';
      dialogConfig.height = '500px';
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      const dialogRef = this.dialog.open(TooltipDialog, dialogConfig);
    }

  }

  
}
