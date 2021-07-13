import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import * as proj from 'ol/proj';
import * as format from 'ol/format';

import { ImportService } from '../../../services/import.service';
import { CartoService } from '../../../../carto/services/carto.service';

@Injectable()
export class LocalisationService {

  private _fichierId: BehaviorSubject<any> = new BehaviorSubject(null);
  
  geojsonSource: VectorSource;
  features: BehaviorSubject<Feature[]> = new BehaviorSubject([]);
  error: BehaviorSubject<any> = new BehaviorSubject(null);
  geojsonFormat = new GeoJSON();
  drawLayer = new VectorLayer({source: new VectorSource({format:new format.GeoJSON({projection: new proj.get('EPSG:3857')})})});
  searchOSMGeoJSONSource: VectorSource = new VectorSource({format:new format.GeoJSON({projection: new proj.get('EPSG:3857')})});
  OSMDataHover: BehaviorSubject<any> = new BehaviorSubject(null);

  get fichierId(): any {
    return this._fichierId;
  }

  set fichierId(fichier: any) {
    this._fichierId.next(fichier);
  }

	constructor(
    private importS: ImportService,
    private cartoS: CartoService
  ) { 
    this.loadSubscribe();
  }

  loadSubscribe() {
    this.fichierId.subscribe(id=> {
      this.loadLocalisationValues();
    });
  }

  loadLocalisationValues() {
    let id = this.fichierId.getValue();
    if (id !== null) {
      this.importS.getLocalisationsGeoms(id)
                    .subscribe(
                      values => this.setGeojsonSource(values),
                      error => this.error.next(error.error.message)
                    );
    }
  }

  setGeojsonSource(values: any[]) {
    let features = []
    values.forEach((el, idx) => {
      if (el.the_geom !== null) {
        features.push(new Feature(this.geojsonFormat.readGeometry(el.geom)));
      } else {
        let point = new Point([el.longitude, el.latitude]);
        features.push(new Feature(point));
      }
    });
    this.features.next(features);
  }

  reset() {
    this._fichierId.next(null);
  }

  setDataSearchOSMGeoJSON(data: any[]) {
    this.searchOSMGeoJSONSource.clear();
    if (data.length) {
      data.forEach(e=>{
        this.searchOSMGeoJSONSource.addFeature(new Feature({
          geometry: new Point([Number(e.lon), Number(e.lat)]).transform('EPSG:4326', 'EPSG:3857'),
          name: e.osm_id
        }))
      });

      if ( this.searchOSMGeoJSONSource.getFeatures().length > 1) {
        this.cartoS.map.getView().fit(this.searchOSMGeoJSONSource.getExtent());
      } else {
        this.cartoS.map.getView().setCenter((this.searchOSMGeoJSONSource.getFeatures()[0]).getGeometry().getCoordinates());
        this.cartoS.map.getView().setZoom(15);
      }
    }
  }
}