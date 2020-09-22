import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { tap, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import * as format from 'ol/format';
import * as proj from 'ol/proj';
import Point from 'ol/geom/Point';

import { ImportService } from '../../../services/import.service';
import { OSMService } from '../../../services/osm.service';
import { FileService } from '../../../services/file.service';
import { LocalisationService } from './localisation.service';
import { CartoService } from '../../../../carto/services/carto.service';
import { LocTableDialog } from './loc-table.dialog';

@Component({
  selector: 'app-import-search-loc',
  templateUrl: './search-loc.component.html',
  styleUrls: ['./search-loc.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [FileService, OSMService]
})
export class SearchLocComponent implements OnInit, OnDestroy {

	form: FormGroup;
	fields: any[];
	fichier: any;
  panelExpanded: boolean = true;
  saving: boolean = false;
  searching: boolean = false;

  checkAllStatus: boolean = false
  done: boolean = false

  localisations: any[] = [];
  columns: string[] = [];
  expandedDetail: any | null;

  displayTempGeom = new VectorLayer({source: new VectorSource({format:new format.GeoJSON({projection: new proj.get('EPSG:3857')})})});

  constructor( 
  	private importS: ImportService,
  	public fileS: FileService,
    private osmS: OSMService,
    public localisationS: LocalisationService,
    public cartoS: CartoService,
  	private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {	
  	this.fileS.file.subscribe(fichier => this.fichier = fichier);
  	
  	this.form = this.fb.group({
      fields: new FormArray([])
    });

  	this.fileS.mappedFields.subscribe(fields => {
  		this.fields = fields;
    	this.addCheckboxes();
  	});

    this.cartoS.map.addLayer(this.displayTempGeom);
  }

  private addCheckboxes() {
    this.fields.forEach((field, idx) => {
      const control = new FormControl(false);
      (this.form.get('fields') as FormArray).push(control);
      control.valueChanges
                .subscribe((v)=>{
                  //retourne le nombre de checkbox non cochée, s'il y'en a on decoche ckeckAll
                  let nb_ckb_off = (this.form.get('fields') as FormArray).controls.filter(field=>!field.value).length
                  if (!v) { //si la case est décochée
                    this.checkAllStatus = false;
                  } else if (nb_ckb_off === 0) { //si tout est coché
                    this.checkAllStatus = true;
                  }
                });

    });
  }

  private getSelectedFields() {
    return this.form.value.fields
      .map((v, i) => v ? this.fields[i].id : null)
      .filter(v => v !== null);
  }

  submit() {
    this.searching = true;
    this.importS.getFieldsValues(this.getSelectedFields())
      .pipe(
        tap((data)=>{
          this.searching = false;
          this.panelExpanded = false;
          if ( data.messages.length ) {

          }
        }),
        map(data=>data.data),
        filter(localisations=>localisations.length),
        tap(localisation=>{
          this.columns = Object.keys(localisation[0]);
          this.columns.unshift('Voir');
        }),
        map(localisation=>localisation.map(loc=>{
          loc.app_geom = loc.adm_geom;
          loc.app_searchValue = new BehaviorSubject<any>(this.setSearchValue(loc));
          return loc;
        }))
      )
      .subscribe(localisations=>this.localisations = localisations)
    
  }

  setSearchValue(localisation) {
    let input = [];
    for (let i = 0; i < this.columns.length ; i++) {
      input.push(localisation[this.columns[i]]);
    }
    return input.join(' ').trim();
  }

  searchOSM(osm, localisation) {
    localisation.app_searchValue.next(osm);

    localisation.app_searchValue
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term: string) => {
          return term.length >= 3 ?
            this.osmS.search(term) : [];
        }),
        tap((data: any[])=>{
          this.localisationS.setDataSearchOSMGeoJSON(data);
        })
      )
      .subscribe(results=>localisation.app_searchResults = results);
  }

  searchCommune(commune, localisation) {
    localisation.app_searchValue.next(commune);

    localisation.app_searchValue
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term: string) => {
          return term.length >= 3 ?
            this.importS.searchCommune(term) : [];
        })
      )
      .subscribe(results=>localisation.app_searchResults = results);
  }

  setOSMLocation(location, OSM) {
    const feature = new Feature({
            geometry: new Point([Number(OSM.lon), Number(OSM.lat)]).transform('EPSG:4326', 'EPSG:3857'),
          })
    this.addGeomToTempLayer(feature);
    location.app_geom = JSON.parse(this.localisationS.geojsonFormat.writeGeometry(feature.getGeometry()));
  }

  setCommuneLocation(location, commune) {
    const feature = new Feature(this.localisationS.geojsonFormat.readGeometry(commune.geometry));
    this.addGeomToTempLayer(feature);
    location.app_geom = JSON.parse(this.localisationS.geojsonFormat.writeGeometry(feature.getGeometry()));
  }

  private addGeomToTempLayer(geom) {
    const source = this.displayTempGeom.getSource();
    source.clear();
    source.addFeature(geom);
  }

  getPointOnMap(location): void {
    if (this.localisationS.drawLayer.getSource().getFeatures().length) {
      let coordinates = ((this.localisationS.drawLayer.getSource().getFeatures()[0]).getGeometry()).getCoordinates()
      location.app_geom =  {
          "type": "Point",
          "coordinates": coordinates
        };
    }
  }

  displayFnOSM(osm): string {
    return osm && osm.display_name ? osm.display_name : '';
  }

  displayFnCommune(commune): string {
    return commune && commune.area_name ? commune.area_name+' ('+commune.area_code+')' : '';
  }

  saveGeom(location) {
    this.saving = true;
    const exclude = ['app_searchResults', 'app_searchValue'];
    location = Object.keys(location)
      .filter(key => !(exclude.includes(key)))
      .reduce((obj, key) => {
        obj[key] = location[key];
        return obj;
      }, {});

    this.importS.postLocalisationGeom(this.fichier.id, location)
      .pipe(
        tap(()=>this.saving = false)
      )
      .subscribe(res=>{
        this.fileS.snackBar(res+' ligne(s) modifiée(s)'); 
        this.localisationS.searchOSMGeoJSONSource.clear();
        this.displayTempGeom.getSource().clear();
        const features = this.localisationS.features.getValue();
        features.push(new Feature(this.localisationS.geojsonFormat.readGeometry(location.adm_geom)))
        this.localisationS.features.next(features);

        //recherche de la valeur modifiée
        this.localisations = this.localisations
          .filter(localisation=>{ 
            let result = 0;
            let i = 0;
            for (let key in location) {
              if ( key !== 'app_geom') {
                i++;   
                if (location[key] == localisation[key]) {
                  result++;
                }    
              }
            }
            return i !== result; //on supprime la ligne enregistrée
          });
      },
      error=>this.fileS.snackBar('Une erreur est survenue'));
  }

  displayTableData(location) {
    const exclude = ['app_searchResults', 'app_searchValue', 'app_geom'];
    location = Object.keys(location)
      .filter(key => !(exclude.includes(key)))
      .reduce((obj, key) => {
        obj[key] = location[key];
        return obj;
      }, {});

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      fichier: this.fichier,
      filter: location
    };
    dialogConfig.maxWidth = '100%';
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = {left: '5%', top: '30px'};

    const dialogRef = this.dialog
                        .open(LocTableDialog, dialogConfig);
  }

  ngOnDestroy() {  
    this.cartoS.map.removeLayer(this.displayTempGeom);
  }
}
