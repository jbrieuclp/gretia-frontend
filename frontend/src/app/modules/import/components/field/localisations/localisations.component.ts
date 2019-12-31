import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as format from 'ol/format';
import * as proj from 'ol/proj';

import { ImportService } from '../../../services/import.service';
import { LocalisationService } from './localisation.service';
import { CartoService } from '../../../../carto/services/carto.service';

@Component({
  selector: 'app-import-field-localisations',
  templateUrl: './localisations.component.html',
  styleUrls: ['./localisations.component.scss']
})
export class FieldLocalisationsComponent implements OnInit {

	fichier: Observable<any>;
	error: Observable<any>;
	raw_data: any;
	_localisations: any[];
  geojson = new VectorLayer({source: new VectorSource({format:new format.GeoJSON({projection: new proj.get('EPSG:3857')})})});

  @HostListener('window:resize', ['$event']) 
    onResize(event) {
      this.resizeMap(); 
  }
  @ViewChild('map') mapView: ElementRef;

  map: Map;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private importS: ImportService,
  	private localisationS: LocalisationService,
    private cartoS: CartoService
  ) { }

  ngOnInit() {
  	let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
	  	this.error = null;
    	this.localisationS.fichierId = Number(id_fichier);
    	this.error = this.localisationS.error;
    } else { 
    	this.router.navigate(['/import']); 
    }
    this.map = this.cartoS.initMap();
    this.cartoS.mapview = this.mapView;
    this.cartoS.map.addLayer(this.geojson);
    this.localisationS.features
                        .subscribe(features=>{
                          let source = this.geojson.getSource();
                          source.clear();
                          source.addFeatures(features);
                        });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
    this.resizeMap();
  }

  resizeMap(){
    let width = this.mapView.nativeElement.offsetWidth;
    let height = window.innerHeight - 66;
    this.cartoS.resizeMap(width, height);
  }



}
