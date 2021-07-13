import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'gr-panel',
  templateUrl: './gr-panel.component.html',
  styleUrls: ['./gr-panel.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', margin: '-1px', overflow: 'hidden', padding: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GrPanelComponent implements OnInit {

	state: string = 'collapsed';

  constructor() { }

  ngOnInit() {
  }

  animateMe(){
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }

}
