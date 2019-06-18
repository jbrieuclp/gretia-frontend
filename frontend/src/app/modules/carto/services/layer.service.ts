import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import VectorSource from 'ol/source/Vector';
import * as proj from 'ol/proj';
import * as extent from 'ol/extent';
import * as format from 'ol/format';

import { AppConfig } from '../../../shared/app.config';
import { CartoService } from './carto.service';


@Injectable()
export class LayerService {


  constructor( cartoS: CartoService ) {}

}
