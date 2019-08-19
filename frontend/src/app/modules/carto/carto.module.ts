import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
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
  MatDatepickerModule,
  MatSelectModule,
  MatBadgeModule,
  MatTableModule
 } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrPanelModule } from '../../shared/templates/gr-panel/gr-panel.module';

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
import { TerritoryPanelComponent, TerritoryPanelDialog } from './components/template/left-panel/territory-panel.component';
import { SearchTaxonComponent } from './components/template/right-panel/search-taxon/search-taxon.component';
import { TaxonsPanelComponent } from './components/template/right-panel/taxons-panel/taxons-panel.component';
import { LegendeComponent } from './components/template/legende/legende.component';
import { IndicateursPanelComponent } from './components/template/right-panel/indicateurs-panel/indicateurs-panel.component';
import { TooltipDialog } from './components/tooltip/tooltip.dialog';
import { TooltipContentComponent } from './components/tooltip/tooltip-content.component';
import { TooltipTaxonsComponent } from './components/tooltip/composents/tt-taxons.component';
import { ImagesComponent, ImageDialog } from './components/template/images/images.component';

//services
import { CartoService } from './services/carto.service';
import { LayerService } from './services/layer.service';
import { TaxrefApiService } from '../../shared/services/taxref-api.service';

//directives

@NgModule({
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatDatepickerModule,
    MatSelectModule,
    MatBadgeModule,
    MatTableModule,
    CartoRoutingModule,
    NgbModule,
    GrPanelModule
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
    TerritoryPanelComponent, 
    TerritoryPanelDialog,
    TooltipDialog,
    TooltipContentComponent,
    TooltipTaxonsComponent,
    ImagesComponent, 
    ImageDialog
  ],
  entryComponents: [ 
    FondsPlanDialog,
    RightPanelDialog,
    GridsPanelDialog,
    TimePanelDialog,
    TerritoryPanelDialog,
    TooltipDialog,
    ImageDialog
  ],
  providers: [
    CartoService,
    LayerService,
    TaxrefApiService
  ],
  bootstrap: [CartoComponent]
})
export class CartoModule { }