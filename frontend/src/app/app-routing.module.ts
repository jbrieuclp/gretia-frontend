import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './shared/guard/index';

import { AccueilComponent } from './modules/accueil/components/accueil/accueil.component';
import { PageNotFoundComponent } from './page-not-found.component';

// routes
const appRoutes: Routes = [
	{ path: '', component: AccueilComponent, pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
