import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from './shared/guard/index';

import { PageNotFoundComponent } from './page-not-found.component';

// routes
const appRoutes: Routes = [
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
