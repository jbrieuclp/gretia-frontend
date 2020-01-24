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

    console.log(this.reference)
    console.log(this.compare)
    const greenSpan = this._renderer.createElement("span");
    const redSpan = this._renderer.createElement("span");
    greenSpan.style.color = "green";
    redSpan.style.color = "red";

    let same = true;
    for (var i = 0; i < this.reference.length; i++) {
      if (this.reference[i] !== this.compare[i] && same) {
        same = false;
      }

      if (same) {
        greenSpan.innerHTML += this.compare[i] != null ? this.compare[i] : '';
      } else {
        redSpan.innerHTML += this.compare[i] != null ? this.compare[i] : '';
      }
    }

    //si le mot comparé est plus long que la référence
    if (this.reference.length < this.compare.length) {
      redSpan.innerHTML += this.compare.substring(this.reference.length);
    }

    this._renderer.appendChild(this._el.nativeElement, greenSpan);
    this._renderer.appendChild(this._el.nativeElement, redSpan);
  }


}