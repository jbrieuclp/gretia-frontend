import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import * as proj from 'ol/proj';

import { ImportService } from '../../../services/import.service';
import { CartoService } from '../../../../carto/services/carto.service';

@Injectable()
export class LocalisationService {

  private _fichierId: BehaviorSubject<any> = new BehaviorSubject(null);
  
  geojsonSource: VectorSource;
  features: BehaviorSubject<Feature[]> = new BehaviorSubject([]);
  error: BehaviorSubject<any> = new BehaviorSubject(null);
  geojsonFormat = new GeoJSON();

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
      this.importS.getLocalisationValues(id)
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
        features.push(new Feature(this.geojsonFormat.readGeometry(el.the_geom)));
      } else {
        let point = new Point([el.longitude, el.latitude]);
        console.log(point);
        console.log(point.transform('EPSG:4326', 'EPSG:3857'));
        features.push(new Feature(point));
      }
    });
    this.features.next(features);
  }

  reset() {
    this._fichierId.next(null);
  }

  // getGeoJSONSource() {
  //   this.geojson.next(values);
  // }
}