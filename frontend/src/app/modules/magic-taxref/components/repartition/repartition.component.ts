import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'mtax-repartition',
  templateUrl: './repartition.component.html',
  styleUrls: ['./repartition.component.css']
})
export class RepartitionComponent implements OnInit {

	_cd_ref: number;
	@Input()
  public set cd_ref(val: number) {
    this._cd_ref = val;
    this.getRepartitionMap(this._cd_ref);
  }
  mapUrl: SafeResourceUrl;

  @ViewChild('repartitionCard') elementView: ElementRef;
  viewHeight: number;
  viewWidth: number;

  mapWidth: number;
  mapHeight: number;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.mapWidth = this.elementView.nativeElement.offsetWidth * 1.26;
  	this.mapHeight = this.elementView.nativeElement.offsetHeight;
  }

  getRepartitionMap(cd_ref){
    if (typeof cd_ref !== 'undefined') {
      let url = 'https://inpn.mnhn.fr/cartosvg/couchegeo/repartition/atlas/' + cd_ref + '/fr_light_l93,fr_lit_l93';
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      return;
    }
    return false;
  }

	onResized($event: ResizedEvent){
		if ($event.newWidth != $event.oldWidth) {
		  this.mapWidth = $event.newWidth*1.26;
		  this.mapHeight = this.mapWidth * 0.53;
		}
	}

}
