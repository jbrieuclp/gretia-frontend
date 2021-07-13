import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared';

//modules
import { MagicTaxrefRoutingModule } from './magic-taxref-routing.module';

//components
import { MagicTaxrefInitComponent } from './magic-taxref-init.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { SynonymeComponent } from './components/fiche/synonyme/synonyme.component';
import { FicheDetailComponent } from './components/fiche/detail/detail.component';
import { ChangementInfoComponent } from './components/fiche/detail/detail.component';
import { SearchingComponent } from './components/fiche/searching/searching.component';
import { TreeComponent } from './components/fiche/tree/tree.component';
import { TreeChildrenComponent } from './components/fiche/tree/children.component';
import { ImageComponent } from './components/fiche/image/image.component';
import { RepartitionComponent } from './components/fiche/repartition/repartition.component';
import { MatchComponent } from './components/match/match.component';

//service
import { VersioningService } from '../magic-taxref/services/versioning.service';
import { TreeService } from './components/fiche/tree/tree.service';
import { FicheService } from './components/fiche/fiche.service';
import { TaxonRepository } from './models/repositories/taxon.repository';
import { TaxrefRepository } from './models/repositories/taxref.repository';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MagicTaxrefRoutingModule,
    SharedModule
  ],
  declarations: [
    MagicTaxrefInitComponent,
  	FicheComponent,
    SynonymeComponent,
    FicheDetailComponent,
    SearchingComponent,
    TreeComponent,
    TreeChildrenComponent,
    ImageComponent,
    ChangementInfoComponent,
    RepartitionComponent,
    MatchComponent
  ],
  providers: [
  	VersioningService,
    TaxonRepository,
    TaxrefRepository,
    FicheService,
    TreeService
  ],
  entryComponents: [ ChangementInfoComponent ]
})
export class MagicTaxrefModule { }
