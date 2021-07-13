import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, tap, filter } from 'rxjs/operators';

import { TaxrefRepository } from '../../../models/repositories';
import { FicheService } from '../fiche.service';
import { Taxref13 } from '../../../models/taxref13.model';

@Component({
  selector: 'app-magictaxref-fiche-repartition',
  templateUrl: './repartition.component.html',
  styleUrls: ['./repartition.component.css']
})
export class RepartitionComponent implements OnInit {

  mapUrl: SafeResourceUrl;

  @HostListener('window:resize', ['event']) 
    onResize(event) {
      this.resizeMapCard(); 
  }
  @ViewChild('mapCard') mapCardView: ElementRef;

  mapCardWidth: number;
  mapCardHeight: number;

  constructor(
    public sanitizer: DomSanitizer,
    private ficheS: FicheService,
  ) { }

  ngOnInit() {
    this.ficheS.cdRef
      .pipe(
        tap(() => this.mapUrl = null),
        filter(cdRef => cdRef !== undefined),
        map(cdRef => this.getRepartitionMap(cdRef)),
        tap(mapUrl => this.mapUrl = mapUrl)
      )
      .subscribe(() => this.resizeMapCard());
  }

  getRepartitionMap(cd_ref){
    const url = `https://inpn.mnhn.fr/cartosvg/couchegeo/repartition/atlas/${cd_ref}/fr_light_l93,fr_lit_l93`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

	resizeMapCard() {
		this.mapCardWidth = this.mapCardView.nativeElement.offsetWidth * 1.26;
    this.mapCardHeight = this.mapCardView.nativeElement.offsetWidth * 0.68;
	}

}
