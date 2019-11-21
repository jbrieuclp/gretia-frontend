import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Visualisation carto',
                navbarColor: {background: '#378AB1', text: "#fff"},
                sidenav: []};

@Component({
  selector: 'app-carto-init',
  template: '<router-outlet></router-outlet>',
})
export class CartoInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }
}
