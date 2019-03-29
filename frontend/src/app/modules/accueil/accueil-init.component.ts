import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Apps du Gretia',
                sidenav: []};

@Component({
  selector: 'app-accueil-init',
  template: '<router-outlet></router-outlet>'
})
export class AccueilInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }
}
