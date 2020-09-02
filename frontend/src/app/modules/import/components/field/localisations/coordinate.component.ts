import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-coordinate',
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.scss']
})
export class CoordinateComponent implements OnInit {

  fichier: Observable<any>;
  error: Observable<any>;
  coordinates: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private importS: ImportService
  ) { }

  ngOnInit() {
    let id_fichier = this.route.snapshot.paramMap.get('fichier');

    if ( id_fichier !== null && Number.isInteger(Number(id_fichier)) ) {

      this.importS
        .getLocalisationValues(Number(id_fichier))
        .subscribe(coordinates=>this.coordinates = coordinates)

    } else { this.router.navigate(['/import']); }
  }

}
