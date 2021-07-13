import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';

// routes definition
const routes: Routes = [
	{ path: 'inscription', component: SigninComponent },
	{ path: 'login', component: LoginComponent }
//	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class LoginRoutingModule { }