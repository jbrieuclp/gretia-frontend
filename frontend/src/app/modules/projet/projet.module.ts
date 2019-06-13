import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

//modules
import { ProjetRoutingModule } from './projet-routing.module';

//directives
import { DisplayMouseOverDirective } from './directives/display-mouse-over.directive';

//components
import { ProjetInitComponent } from './projet-init.component';
import { AdminComponent } from './components/admin/admin.component';
import { PersonComponent } from './components/admin/person/person.component';
import { PersonFormComponent } from './components/admin/person/form/person-form.component';
import { OrganismeComponent } from './components/admin/organisme/organisme.component';
import { OrganismeFormComponent } from './components/admin/organisme/form/organisme-form.component';
import { CategorieComponent } from './components/admin/categorie/categorie.component';
import { CategoryFormComponent } from './components/admin/categorie/form/category-form.component';
import { EtatComponent } from './components/admin/etat/etat.component';
import { EtatFormComponent } from './components/admin/etat/form/etat-form.component';
import { TypeComponent } from './components/admin/type/type.component';
import { TypeFormComponent } from './components/admin/type/form/type-form.component';
import { ProjetFormComponent } from './components/projet/form/projet-form.component';
import { PartenaireFormComponent } from './components/projet/form/partenaire-form.component';
import { ProjetTravailleurFormComponent } from './components/projet/form/p-travailleur-form.component';
import { PListComponent } from './components/projet/p-list/p-list.component';
import { MissionFormComponent } from './components/mission/form/mission-form.component';
import { MissionTravailleurFormComponent } from './components/mission/form/m-travailleur-form.component';
import { TravailleurFormComponent } from './components/person/form/travailleur-form.component';
import { SListComponent } from './components/suiveuse/s-list/s-list.component';
import { MySListComponent } from './components/suiveuse/my-s-list/my-s-list.component';
import { SFormComponent } from './components/suiveuse/s-form/s-form.component';

//repository
import { PersonRepository } from './repository/person.repository';
import { CategoryRepository } from './repository/category.repository';
import { EtatRepository } from './repository/etat.repository';
import { TypeRepository } from './repository/type.repository';
import { ProjetRepository } from './repository/projet.repository';
import { OrganismeRepository } from './repository/organisme.repository';
import { MissionRepository } from './repository/mission.repository';
import { SuiveuseRepository } from './repository/suiveuse.repository';

//services
import { ProjetFormService } from './services/projet-form.service';
import { SuiveuseService } from './components/suiveuse/suiveuse.service';


@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule, 
    ReactiveFormsModule,
    FormsModule,
    ProjetRoutingModule
  ],
  declarations: [
  	ProjetInitComponent,
  	AdminComponent,
  	PersonComponent,
    PersonFormComponent,
    OrganismeComponent,
    OrganismeFormComponent,
    DisplayMouseOverDirective,
    CategorieComponent,
    CategoryFormComponent,
    EtatComponent,
    EtatFormComponent,
    TypeComponent,
    TypeFormComponent,
    ProjetFormComponent,
    PartenaireFormComponent,
    ProjetTravailleurFormComponent,
    PListComponent,
    MissionFormComponent,
    MissionTravailleurFormComponent,
    TravailleurFormComponent,
    SListComponent,
    MySListComponent,
    SFormComponent
  ],
  entryComponents: [
    MissionTravailleurFormComponent,
    PartenaireFormComponent,
    ProjetTravailleurFormComponent
  ],
  providers: [
    PersonRepository,
    CategoryRepository,
    EtatRepository,
    TypeRepository,
    ProjetRepository,
    OrganismeRepository,
    MissionRepository,
    SuiveuseRepository,
    ProjetFormService,
    SuiveuseService
  ]
})
export class ProjetModule { }
