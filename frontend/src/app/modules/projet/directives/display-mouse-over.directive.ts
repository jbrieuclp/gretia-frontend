import {Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[displayMouseOver]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class DisplayMouseOverDirective {
	private _defaultColor = '#e1d1ff';
  private el: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer2) { 
  	console.log(el);
  	this.el = el.nativeElement; 
  }

  @Input('displayMouseOver') highlightColor: string;

  onMouseEnter() { 
  	let btns = this.el.querySelectorAll('.btn');
    for (var i=0; i < btns.length; i++) {
    		btns[i].classList.remove('d-none');
    }
  	this.highlight(this.highlightColor || this._defaultColor); 
  }
  onMouseLeave() { 
  	let btns = this.el.querySelectorAll('.btn');
    for (var i=0; i < btns.length; i++) {
        btns[i].classList.add('d-none');
    }
  	this.highlight(null); 
  }

   private highlight(color:string) {
    this.el.style.backgroundColor = color;
  }
}