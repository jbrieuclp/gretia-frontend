import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSidenavModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
 } from '@angular/material';

//modules
import { CartoRoutingModule } from './carto-routing.module';

//components
import { CartoComponent } from './components/carto.component';
import { FondsPlanPanelComponent, FondsPlanDialog } from './components/template/left-panel/fonds-plan.component';
import { CartoInitComponent } from './carto-init.component';
import { LeftPanelComponent } from './components/template/left-panel/left-panel.component';
import { RightPanelComponent } from './components/template/right-panel/right-panel.component';
import { RightPanelDialog } from './components/template/right-panel/right-panel.component';

//services
import { CartoService } from './services/carto.service';
import { LayerService } from './services/layer.service';
import { RepartitionService } from './services/repartition.service';
import { SearchTaxonComponent } from './components/template/right-panel/search-taxon/search-taxon.component';

@NgModule({
  exports: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    CartoRoutingModule
  ],
  declarations: [
    CartoComponent,
    CartoInitComponent,
    LeftPanelComponent,
    FondsPlanPanelComponent,
    FondsPlanDialog,
    RightPanelComponent,
    RightPanelDialog,
    SearchTaxonComponent
  ],
  entryComponents: [ 
    FondsPlanDialog,
    RightPanelDialog
  ],
  providers: [
    CartoService,
    LayerService,
    RepartitionService
  ],
  bootstrap: [CartoComponent]
})
export class CartoModule { }