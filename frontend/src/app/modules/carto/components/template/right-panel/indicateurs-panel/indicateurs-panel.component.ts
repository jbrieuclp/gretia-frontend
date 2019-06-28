import { Component, OnInit } from '@angular/core';
import { LayerService } from '../../../../services/layer.service';

@Component({
  selector: 'app-carto-indicateurs-panel',
  templateUrl: './indicateurs-panel.component.html',
  styleUrls: ['./indicateurs-panel.component.scss']
})
export class IndicateursPanelComponent implements OnInit {

  constructor(public layerS: LayerService) { }

  ngOnInit() {
  }

  switchIndicateur(checked:boolean, ID: 'PRESSION_LAYER'|'RICHESSE_LAYER'){
 		//si premier chargement de la couche
  	if (checked && !this.layerExist(ID)) {
  		this.layerS.addIndicateurLayer(ID);
  		return;
  	}
  	//sinon on switch la visibilité
  	this.getLayer(ID).olLayer.setVisible(checked);
  }

  layerExist(ID: 'PRESSION_LAYER'|'RICHESSE_LAYER'): boolean {
  	return this.layerS.layerExist(ID);
  }

  getLayer(ID: 'PRESSION_LAYER'|'RICHESSE_LAYER') {
  	return this.layerS.getLayer(ID);
  }

  isVisible(ID: 'PRESSION_LAYER'|'RICHESSE_LAYER') {
  	return this.layerS.isVisible(ID);
  }

  setStatut(event):void {
    event.checked ? this.layerS.addStatut(event.source.value) : this.layerS.removeStatut(event.source.value);
  }

}
