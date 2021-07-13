import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {

	@Input() message: string;
	@Input() size: number = 40;

	get strokeWidth() {
		return Math.round(this.size/10) > 1 ? Math.round(this.size/10) : 1;
	}

  constructor() { }
}
