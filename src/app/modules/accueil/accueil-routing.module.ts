import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { AccueilInitComponent } from './accueil-init.component';
import { AccueilComponent } from './components/accueil/accueil.component';

// routes definition
const routes: Routes = [
	{ 
		path: '', 
		component: AccueilInitComponent,
		children: [
	    {
	      path: '',
	      component: AccueilComponent
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
export class AccueilRoutingModule { }