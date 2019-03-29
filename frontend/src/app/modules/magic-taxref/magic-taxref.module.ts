import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';

//modules
import { MagicTaxrefRoutingModule } from './magic-taxref-routing.module';

//components
import { MagicTaxrefInitComponent } from './magic-taxref-init.component';
import { DisplayComponent } from './components/display/display.component';
import { KeysPipe } from '../../shared/pipes/keys.pipe';

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

@NgModule({
  imports: [
    CommonModule,
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
    NgbModule,
    AngularResizedEventModule,
    MagicTaxrefRoutingModule
  ],
  declarations: [
    MagicTaxrefInitComponent,
  	DisplayComponent,
    KeysPipe,
    SynonymeComponent,
    VDetailComponent,
    SearchingComponent,
    TreeComponent,
    TreeChildrenComponent,
    ImageComponent,
    ChangementInfoComponent,
    RepartitionComponent
  ],
  providers: [
  	VersioningService
  ],
  entryComponents: [ ChangementInfoComponent ]
})
export class MagicTaxrefModule { }
