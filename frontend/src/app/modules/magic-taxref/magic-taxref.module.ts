import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { SharedModule } from '../../shared';

//modules
import { MagicTaxrefRoutingModule } from './magic-taxref-routing.module';

//components
import { MagicTaxrefInitComponent } from './magic-taxref-init.component';
import { DisplayComponent } from './components/display/display.component';

//service
import { VersioningService } from '../magic-taxref/services/versioning.service';
import { SynonymeComponent } from './components/synonyme/synonyme.component';
import { VDetailComponent } from './components/v-detail/v-detail.component';
import { ChangementInfoComponent } from './components/v-detail/v-detail.component';
import { SearchingComponent } from './components/searching/searching.component';
import { TreeComponent } from './components/tree/tree.component';
import { TreeChildrenComponent } from './components/tree/children.component';
import { ImageComponent } from './components/image/image.component';
import { RepartitionComponent } from './components/repartition/repartition.component';
import { MatchComponent } from './components/match/match.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AngularResizedEventModule,
    MagicTaxrefRoutingModule,
    SharedModule
  ],
  declarations: [
    MagicTaxrefInitComponent,
  	DisplayComponent,
    SynonymeComponent,
    VDetailComponent,
    SearchingComponent,
    TreeComponent,
    TreeChildrenComponent,
    ImageComponent,
    ChangementInfoComponent,
    RepartitionComponent,
    MatchComponent
  ],
  providers: [
  	VersioningService
  ],
  entryComponents: [ ChangementInfoComponent ]
})
export class MagicTaxrefModule { }
