import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { MagicTaxrefInitComponent } from './magic-taxref-init.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { MatchComponent } from './components/match/match.component';

// routes definition
const routes: Routes = [
	{ 
		path: 'taxref', 
		component: MagicTaxrefInitComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: FicheComponent, pathMatch: 'full' },
			{ path: 'recherche', component: FicheComponent, pathMatch: 'full'},
			{ path: 'taxon/:cd_nom', component: FicheComponent, pathMatch: 'full'},
			{ path: 'match', component: MatchComponent, pathMatch: 'full'},
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
export class MagicTaxrefRoutingModule { }