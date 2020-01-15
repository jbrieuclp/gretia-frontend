import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/index';

import { ImportInitComponent } from './import-init.component';
import { FilesListComponent } from './components/file/list/list.component';
import { FileDashboardComponent } from './components/file/dashboard/dashboard.component';
import { FileMapperComponent } from './components/file/mapper/mapper.component';
import { FieldListComponent } from './components/field/list/list.component';
import { FieldObserversComponent } from './components/field/observers/observers.component';
import { FileImportComponent } from './components/file/import/import.component';
import { FieldLocalisationsComponent } from './components/field/localisations/localisations.component';
import { FileAddFieldComponent } from './components/file/add-field/add-field.component';
import { FileRequiredFieldComponent } from './components/file/required-field/required-field.component';
import { FileInsertComponent } from './components/file/insert/insert.component';
import { DuplicateLinesComponent } from './components/file/duplicate-lines/duplicate-lines.component';


// routes definition
const routes: Routes = [
	{ 
		path: 'import', 
		component: ImportInitComponent,
		canActivate: [AuthGuard],
		children: [
	    {
	      path: '',
	      component: FilesListComponent
	    },
			{ path: 'import', component: FileImportComponent, pathMatch: 'full' },
	    { path: 'fichier', children: [
				{ path: '', component: FileDashboardComponent, pathMatch: 'full' },
				{ path: ':fichier', children: [
					{ path: '', component: FileDashboardComponent, pathMatch: 'full' },
					{ path: 'add-field', component: FileAddFieldComponent, pathMatch: 'full' },
					{ path: 'mapper', component: FileMapperComponent, pathMatch: 'full' },
					{ path: 'required-fields', component: FileRequiredFieldComponent, pathMatch: 'full' },
					{ path: 'champs', component: FieldListComponent, pathMatch: 'full' },
					{ path: 'observateurs', component: FieldObserversComponent, pathMatch: 'full' },
					{ path: 'localisations', component: FieldLocalisationsComponent, pathMatch: 'full' },
					{ path: 'insert', component: FileInsertComponent, pathMatch: 'full' },
					{ path: 'duplicate-lines', component: DuplicateLinesComponent, pathMatch: 'full' },
				//	{ path: 'missions', children: [ //TODO : affiche toutes les mission en tableau
				//	{ path: 'champs', component: MissionFormComponent, pathMatch: 'full' },
				]},
			]},
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
export class ImportRoutingModule { }