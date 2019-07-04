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
  MatBadgeModule
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
import { TerritoryPanelComponent, TerritoryPanelDialog } from './components/template/left-panel/territory-panel.component';
import { SearchTaxonComponent } from './components/template/right-panel/search-taxon/search-taxon.component';
import { TaxonsPanelComponent } from './components/template/right-panel/taxons-panel/taxons-panel.component';
import { LegendeComponent } from './components/template/legende/legende.component';
import { IndicateursPanelComponent } from './components/template/right-panel/indicateurs-panel/indicateurs-panel.component';
import { TooltipDialog } from './components/tooltip/tooltip.dialog';
import { TooltipContentComponent } from './components/tooltip/tooltip-content.component';
import { PressionInfoComponent } from './layers/template/pression/pression-info.component';
import { RepartitionInfoComponent } from './layers/template/repartition/repartition-info.component';
import { RichesseInfoComponent } from './layers/template/richesse/richesse-info.component';

//services
import { CartoService } from './services/carto.service';
import { LayerService } from './services/layer.service';

//directives
import { LayerInfoDirective } from './layers/template/layer-info.directive';

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
    TerritoryPanelComponent, 
    TerritoryPanelDialog,
    TooltipDialog,
    PressionInfoComponent,
    LayerInfoDirective,
    RepartitionInfoComponent,
    RichesseInfoComponent,
    TooltipContentComponent
  ],
  entryComponents: [ 
    FondsPlanDialog,
    RightPanelDialog,
    GridsPanelDialog,
    TimePanelDialog,
    TerritoryPanelDialog,
    TooltipDialog,
    PressionInfoComponent,
    RichesseInfoComponent,
    RepartitionInfoComponent
  ],
  providers: [
    CartoService,
    LayerService
  ],
  bootstrap: [CartoComponent]
})
export class CartoModule { }