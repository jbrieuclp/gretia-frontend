import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import { CartoService } from '../services/carto.service';

@Component({
  selector: 'app-carto',
  templateUrl: './carto.component.html',
  styleUrls: ['./carto.component.css']
})
export class CartoComponent implements OnInit {

  @HostListener('window:resize', ['$event']) 
    onResize(event) {
      this.resizeMap(); 
  }
  @ViewChild('map') mapView: ElementRef;

  map: Map;

  constructor(
    private cartoS: CartoService
  ) { }

  ngOnInit() {
    this.map = this.cartoS.initMap();
    this.cartoS.mapview = this.mapView;
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
