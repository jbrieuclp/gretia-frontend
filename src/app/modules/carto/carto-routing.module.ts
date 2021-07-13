import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { CartoInitComponent } from './carto-init.component';
import { CartoComponent } from './components/carto.component';

// routes definition
const routes: Routes = [
	{ 
		path: 'carto', 
		component: CartoInitComponent,
		canActivate: [AuthGuard],
		children: [
	    {
	      path: '',
	      component: CartoComponent
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
export class CartoRoutingModule { }