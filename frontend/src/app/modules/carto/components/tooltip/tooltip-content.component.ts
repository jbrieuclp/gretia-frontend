import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { LayerService } from '../../services/layer.service';
import { LayerInfoDirective } from '../../layers/template/layer-info.directive';
import { PressionInfoComponent } from '../../layers/template/pression/pression-info.component';

@Component({
  selector: 'app-carto-tooltip-content',
  template: '<ng-template layer-info></ng-template>'
})
export class TooltipContentComponent implements OnInit {

	@Input('layer_id') layer_id: any;
	@Input('feature') feature: any;
  @ViewChild(LayerInfoDirective) adHost: LayerInfoDirective;

  constructor(
  	private layerS: LayerService,
  	private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
  }


  loadComponent() {
    let layer = this.layerS.getLayer(this.layer_id);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(layer.template_component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).data = {feature: this.feature, layer: layer, layerS: this.layerS};
  }
}
