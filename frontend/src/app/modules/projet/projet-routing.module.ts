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
import { ProjetFormComponent } from './components/projet/form/projet-form.component';
import { MissionFormComponent } from './components/mission/form/mission-form.component';
import { SListUserComponent } from './components/suiveuse/list-user/list-user.component';
import { DashboardComponent } from './components/suiveuse/dashboard/dashboard.component';
import { ProjetDisplayComponent } from './components/projet/display/display.component';
import { CalendarComponent } from './components/suiveuse/calendar/calendar.component';

// routes definition
const routes: Routes = [
	{ 
		path: 'projet', 
		component: ProjetInitComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'projets', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
			{ path: 'projets', component: PListComponent, pathMatch: 'full'},
			{ path: 'projet', children: [
				{ path: '', component: ProjetFormComponent, pathMatch: 'full' },
				{ path: ':projet', children: [
					{ path: '', component: ProjetFormComponent, pathMatch: 'full' },
				//	{ path: 'missions', children: [ //TODO : affiche toutes les mission en tableau
					{ path: 'mission', component: MissionFormComponent, pathMatch: 'full' },
					{ path: 'view', component: ProjetDisplayComponent, pathMatch: 'full' },
				]},
			]},
			{ path: 'mission', children: [
			//	{ path: 'info', component: MissionFormComponent, pathMatch: 'full' } //TODO: Detail
				{ path: ':mission', component: MissionFormComponent, pathMatch: 'full' }
			]},
			{ path: 'suiveuses', component: SListUserComponent, pathMatch: 'full'},
			{ path: 'suiveuse', children: [
				{ path: '', component: CalendarComponent, pathMatch: 'full' },
				{ path: 'user/:person', children: [
					{ path: '', component: CalendarComponent, pathMatch: 'full' },
				//	{ path: 'missions', children: [ //TODO : affiche toutes les mission en tableau
				]}
			]},
			{ path: 'admin', children: [
				{ path: '', component: AdminComponent, pathMatch: 'full' },
				{ path: 'personne', component: PersonComponent, pathMatch: 'full' },
				{ path: 'organisme', component: OrganismeComponent, pathMatch: 'full' },
				{ path: 'categorie', component: CategorieComponent, pathMatch: 'full' },
				{ path: 'etat', component: EtatComponent, pathMatch: 'full' },
				{ path: 'type', component: TypeComponent, pathMatch: 'full' }
			]}
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