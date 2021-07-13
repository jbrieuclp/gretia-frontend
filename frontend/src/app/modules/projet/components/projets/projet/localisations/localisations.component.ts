import { Component } from '@angular/core';

import { ProjectLocalisationsService } from './localisations.service';

@Component({
  selector: 'app-projets-projet-localisations',
  templateUrl: './localisations.component.html',
  styleUrls: ['./localisations.component.scss']
})
export class ProjectLocalisationsComponent {

  get localisations() { return this.localisationsS.localisations; }

  get loading() { return this.localisationsS.loading; }

  constructor(
    private localisationsS: ProjectLocalisationsService,
  ) { }

}
