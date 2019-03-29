import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Magic Taxref',
                sidenav: [
                  {title: 'Accueil', url: '/', img: 'home', tooltip: 'Accueil'},
                  {title: 'Rechercher', url: '/taxref/recherche', img: 'search', tooltip: 'Rechercher un taxon'},
                ]};

@Component({
  selector: 'app-jdd-init',
  template: '<router-outlet></router-outlet>'
})
export class MagicTaxrefInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }

}
