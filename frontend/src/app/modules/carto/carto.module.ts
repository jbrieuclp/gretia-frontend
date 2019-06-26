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
  MatProgressBarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatRadioModule
 } from '@angular/material';

//modules
import { CartoRoutingModule } from './carto-routing.module';

//components
import { CartoComponent } from './components/carto.component';
import { FondsPlanPanelComponent, FondsPlanDialog } from './components/template/left-panel/fonds-plan.component';
import { CartoInitComponent } from './carto-init.component';
import { LeftPanelComponent } from './components/template/left-panel/left-panel.component';
import { GridsPanelComponent, GridsPanelDialog } from './components/template/left-panel/grids-panel.component';
import { RightPanelComponent, RightPanelDialog } from './components/template/right-panel/right-panel.component';
import { TimePanelComponent, TimePanelDialog } from './components/template/left-panel/time-panel.component';

//services
import { CartoService } from './services/carto.service';
import { LayerService } from './services/layer.service';
import { SearchTaxonComponent } from './components/template/right-panel/search-taxon/search-taxon.component';
import { TaxonsPanelComponent } from './components/template/right-panel/taxons-panel/taxons-panel.component';
import { LegendeComponent } from './components/template/legende/legende.component';
import { IndicateursPanelComponent } from './components/template/right-panel/indicateurs-panel/indicateurs-panel.component';
import { TooltipDialog } from './components/tooltip/tooltip.dialog';

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
    MatProgressBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    CartoRoutingModule,
  ],
  declarations: [
    CartoComponent,
    CartoInitComponent,
    LeftPanelComponent,
    FondsPlanPanelComponent,
    FondsPlanDialog,
    RightPanelComponent,
    RightPanelDialog,
    SearchTaxonComponent,
    TaxonsPanelComponent,
    LegendeComponent,
    IndicateursPanelComponent,
    GridsPanelComponent,
    GridsPanelDialog,
    TimePanelComponent, 
    TimePanelDialog, 
    TooltipDialog
  ],
  entryComponents: [ 
    FondsPlanDialog,
    RightPanelDialog,
    GridsPanelDialog,
    TimePanelDialog,
    TooltipDialog
  ],
  providers: [
    CartoService,
    LayerService
  ],
  bootstrap: [CartoComponent]
})
export class CartoModule { }