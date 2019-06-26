import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layer-info]',
})
export class LayerInfoDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}