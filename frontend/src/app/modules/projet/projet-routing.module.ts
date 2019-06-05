import { NgModule }             from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { ProjetInitComponent } from './projet-init.component';
import { AdminComponent } from './components/admin/admin.component';
import { PersonComponent } from './components/admin/person/person.component';
import { OrganismeComponent } from './components/admin/organisme/organisme.component';
import { CategorieComponent } from './components/admin/categorie/categorie.component';
import { EtatComponent } from './components/admin/etat/etat.component';
import { TypeComponent } from './components/admin/type/type.component';
import { PListComponent } from './components/projet/p-list/p-list.component';
import { ProjetAddComponent } from './components/projet/p-add/projet-add.component';
import { PDisplayComponent } from './components/projet/p-display/p-display.component';
import { MissionFormComponent } from './components/mission/form/mission-form.component';

export function IdMatcher(url: UrlSegment[]) {

	if (url.length === 0) {
    return null;
  }

  const reg = /^\d+$/;
  const param = url[ 0 ].toString();

	console.log(url);
	console.log(url[0].path.match(/^\d+$/));
	console.log(new UrlSegment(url[0].path, {}));
	if (param.match( reg )) {
		return {
			consumed: url,
			posParams: {
        id: url[0]
      }
    }
	}
	return null;
}

// routes definition
const routes: Routes = [
	{ 
		path: 'projet', 
		component: ProjetInitComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'projets', pathMatch: 'full' },
			{ path: 'projets', children: [
				{ path: '', component: PListComponent, pathMatch: 'full' },
				{ path: 'ajouter', component: ProjetAddComponent, pathMatch: 'full' },
				{ path: ':projet', children: [
					{ path: '', component: PDisplayComponent, pathMatch: 'full' },
				//	{ path: 'missions', children: [ //TODO : affiche toutes les mission en tableau
					{ path: 'mission', component: MissionFormComponent, pathMatch: 'full' },
				]},
			]},
			{ 
				path: 'mission', children: [
			//	{ path: 'info', component: MissionFormComponent, pathMatch: 'full' } //TODO: Detail
				{ path: ':mission', component: MissionFormComponent, pathMatch: 'full' }
			]},
			{ 
				path: 'admin', 
				children: [
					{ path: '', component: AdminComponent, pathMatch: 'full' },
					{ path: 'personne', component: PersonComponent, pathMatch: 'full' },
					{ path: 'organisme', component: OrganismeComponent, pathMatch: 'full' },
					{ path: 'categorie', component: CategorieComponent, pathMatch: 'full' },
					{ path: 'etat', component: EtatComponent, pathMatch: 'full' },
					{ path: 'type', component: TypeComponent, pathMatch: 'full' }
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProjetRoutingModule { }