import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent {

	@Input() color:string = 'primary'
	@Input() text:string = '';
	@Input() type:string = 'button';
	@Input() disabled:boolean = false;
	@Input() waiting:boolean = false;

  constructor() { }

}
