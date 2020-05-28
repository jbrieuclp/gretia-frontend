import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Magic Taxref',
                sidenav: [
                  {title: 'Accueil', url: '/', img: 'home', tooltip: 'Accueil'},
                  {title: 'Fiche taxonomique', url: '/taxref/recherche', img: 'emoji_nature', tooltip: 'Consultation d\'une fiche taxonomique'},
                  {title: 'Match', url: '/taxref/match', img: 'search', tooltip: 'Rechercher un taxon'},
                ]};

@Component({
  selector: 'app-jdd-init',
  template: '<div class="container-fluid"><router-outlet></router-outlet></div>'
})
export class MagicTaxrefInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }

}
