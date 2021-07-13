import { Component } from '@angular/core';

import { ProjectResponsablesService } from './responsables.service';

@Component({
  selector: 'app-projets-projet-responsables',
  templateUrl: './responsables.component.html'
})
export class ProjectResponsablesComponent {

  get responsables() { return this.responsablesS.responsables; }

  get loading() { return this.responsablesS.loading; }

  constructor(
    private responsablesS: ProjectResponsablesService,
  ) { }

}
