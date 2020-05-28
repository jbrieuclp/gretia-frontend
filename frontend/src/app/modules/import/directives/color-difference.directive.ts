import {Directive, Renderer2, ElementRef, Input, AfterContentInit} from '@angular/core';

@Directive({
  selector: '[colorDifference]'
})
export class ColorDifferenceDirective implements AfterContentInit {
 
  @Input('reference') reference: string;
  @Input('compare') compare: string;

  private green = 'green';
  private red = 'red';

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    
  }

  public ngAfterContentInit() {

    let span = this._renderer.createElement("span");
    span.style.color = "green";
    for (var i = 0; i < this.reference.length; i++) {
      //Si le comparatif de la lettre en cours est différent du comparatif de la lettre precedente
      if ( (this.reference[i-1] === this.compare[i-1]) !== (this.reference[i] === this.compare[i]) ) {
        this._renderer.appendChild(this._el.nativeElement, span);
        span = this._renderer.createElement("span");
      }

      //on compare la lettre en cours
      span.style.color = (this.reference[i] === this.compare[i]) ? 'green' : 'red';

      span.innerHTML += this.compare[i] != null ? this.compare[i] : '';

    }

    this._renderer.appendChild(this._el.nativeElement, span);

    //si le mot comparé est plus long que la référence
    if (this.reference.length < this.compare.length) {
      span = this._renderer.createElement("span");
      span.style.color = "red";
      span.innerHTML = this.compare.substring(this.reference.length);
      this._renderer.appendChild(this._el.nativeElement, span);
    }
  }


}