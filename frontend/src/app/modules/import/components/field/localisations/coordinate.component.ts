import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ImportService } from '../../../services/import.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-import-coordinate',
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.scss']
})
export class CoordinateComponent implements OnInit {

  fichier_id: number;
  error: string = null;
  coordinates: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private importS: ImportService,
    public fileS: FileService
  ) { }

  ngOnInit() {
    let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {
      this.fichier_id = Number(id_fichier);

      this.importS
        .getLocalisationValues(this.fichier_id)
        .pipe(
          tap(coordinates=>
            coordinates.map(coord=>{
              coord.projection = this.getProjection(coord);
              return coord;
            })
          )
        )
        .subscribe(
          coordinates=>this.coordinates = coordinates,
          error=>this.error = error.error.message
        );

    } else { this.router.navigate(['/import']); }
  }

  getProjection(coord): {proj: string, epsg: number} {
    let lat = coord.latitude;
    let lon = coord.longitude;
    if ( lat === undefined || lon === undefined || lat === null || lon === null ) {
      return {proj: 'Erreur', epsg: null};
    }

    if ( !isNaN(Number(lat.replace(',', '.'))) && !isNaN(Number(lon.replace(',', '.')))) {
      lat = Number(lat.replace(',', '.'));
      lon = Number(lon.replace(',', '.'));
      //si latitude et longitude sont des chiffres
      if ( (lat >= -90 && lat <= 90) && (lon >= -180 && lon <= 180) ) {
        return {proj: 'WGS84', epsg: 4326};
      } else if ( (lat >= 6000000) ) {
        return {proj: 'L93F', epsg: 2154};
      }
    }
  }

  getProjSynthese() {
    let synthese: {proj: string, count: number}[] = [];
    let projRow = null;
    this.coordinates.forEach(e=>{
      projRow = synthese.find(projRow=>projRow.proj == e.projection.proj);
      if ( projRow === undefined ) {
        synthese.push({proj: e.projection.proj, count: 1});
      } else {
        projRow.count++;
      }
    });
    return synthese;
  }

  coordsToPoint() {
    this.importS.postCoordsToPoint(this.fichier_id, this.coordinates)
      .subscribe(result=>this.fileS.snackBar(result.ok+' points ok ; '+result.bad+' pas ok'));
  }

}
