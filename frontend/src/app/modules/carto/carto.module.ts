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
  MatSliderModule
 } from '@angular/material';

//modules
import { CartoRoutingModule } from './carto-routing.module';

//components
import { CartoComponent } from './components/carto.component';
import { FondsPlanPanelComponent, FondsPlanDialog } from './components/template/left-panel/fonds-plan.component';
import { CartoInitComponent } from './carto-init.component';
import { LeftPanelComponent } from './components/template/left-panel/left-panel.component';

//services
import { CartoService } from './carto.service';

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
    CartoRoutingModule
  ],
  declarations: [
    CartoComponent,
    CartoInitComponent,
    LeftPanelComponent,
    FondsPlanPanelComponent,
    FondsPlanDialog
  ],
  entryComponents: [ 
    FondsPlanDialog 
  ],
  providers: [
    CartoService
  ],
  bootstrap: [CartoComponent]
})
export class CartoModule { }