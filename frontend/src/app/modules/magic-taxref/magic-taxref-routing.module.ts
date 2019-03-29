import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { MagicTaxrefInitComponent } from './magic-taxref-init.component';
import { DisplayComponent } from './components/display/display.component';

// routes definition
const routes: Routes = [
	{ 
		path: 'taxref', 
		component: MagicTaxrefInitComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: DisplayComponent, canActivate: [AuthGuard] },
			{ path: 'recherche', component: DisplayComponent, canActivate: [AuthGuard] },
			{ path: 'taxon/:cd_nom', component: DisplayComponent, canActivate: [AuthGuard] }
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