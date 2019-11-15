import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Import',
                navbarColor: {background: '#378AB1', text: "#fff"},
                sidenav: [
                	{title: 'Accueil', url: '/', img: 'home', tooltip: 'Accueil'},
                	{title: 'Liste des fichiers', url: '/import', img: 'assignment', tooltip: 'Liste des fichiers'}
                ]};

@Component({
  selector: 'app-import-init',
  template: '<div class="container-fluid"><router-outlet></router-outlet></div>',
})
export class ImportInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }
}
