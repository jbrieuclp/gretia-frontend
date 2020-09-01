import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

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
import { SListUserComponent } from './components/suiveuse/list-user/list-user.component';
import { ProjetDisplayComponent } from './components/projet/display/display.component';
import { DashboardComponent } from './components/suiveuse/dashboard/dashboard.component';
import { CalendarComponent } from './components/suiveuse/calendar/calendar.component';

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
import { TravailFormService } from './services/travail-form.service';

//dialog
import { TravailFormDialog } from './components/suiveuse/calendar/travail-form.dialog';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    CdkTreeModule,
    SharedModule,
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
    SListUserComponent,
    DashboardComponent,
    ProjetDisplayComponent,
    CalendarComponent,
    TravailFormDialog
  ],
  entryComponents: [
    MissionTravailleurFormComponent,
    PartenaireFormComponent,
    ProjetTravailleurFormComponent,
    TravailFormDialog
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
    SuiveuseService,
    TravailFormService
  ]
})
export class ProjetModule { }
