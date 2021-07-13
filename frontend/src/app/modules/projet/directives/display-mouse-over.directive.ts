import {Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[displayMouseOver]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class DisplayMouseOverDirective {
	private _defaultColor = null;
  private el: HTMLElement;

  constructor(
    el: ElementRef, 
    private renderer: Renderer2
  ) { 
  	this.el = el.nativeElement; 
  }

  @Input('displayMouseOverColor') highlightColor: string;
  @Input('displayMouseOverSelector') selector: string;

  onMouseEnter() { 
  	let btns = this.el.querySelectorAll(this.selector);
    for (var i=0; i < btns.length; i++) {
    		btns[i].classList.remove('d-none');
    }
  	this.highlight(this.highlightColor || this._defaultColor); 
  }
  onMouseLeave() { 
  	let btns = this.el.querySelectorAll(this.selector);
    for (var i=0; i < btns.length; i++) {
        btns[i].classList.add('d-none');
    }
  	this.highlight(null); 
  }

   private highlight(color:string) {
    this.el.style.backgroundColor = color;
  }
}