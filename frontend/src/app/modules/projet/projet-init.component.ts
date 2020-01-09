import { Component } from '@angular/core';

//services
import { LayoutService } from '../../shared/layout/layout.service';

const layout = {title: 'Suivis Études',
                sidenav: [
                  {title: 'Accueil', url: '/', img: 'home', tooltip: 'Accueil'},
                  {title: 'Études', url: '/projet/projets', img: 'folder', tooltip: 'Liste des études'},
                  {title: 'Nouvelle étude', url: '/projet/projet', img: 'folder', tooltip: 'Ajouter une étude'},
                  {title: 'Suiveuse', url: '/projet/suiveuse', img: 'query_builder', tooltip: 'Remplir la suiveuse'},
                  {title: 'Dashboard', url: '/projet/dashboard', img: 'assessment', tooltip: 'Remplir la suiveuse'},
                  {title: 'Administration', url: '/projet/admin', img: 'build', tooltip: 'Administration'}
                ]};

@Component({
  selector: 'app-projet-init',
  template: '<div class="container-fluid"><router-outlet></router-outlet></div>'
})
export class ProjetInitComponent {

  constructor(private layoutService: LayoutService) { 
    this.layoutService.setLayout(layout);
  }

}
