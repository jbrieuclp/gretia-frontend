import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  MatIconModule
 } from '@angular/material';

 import { GrPanelComponent } from './gr-panel.component';
// import { FooterComponent } from './footer/footer.component';
// import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    GrPanelComponent, 
    // FooterComponent, 
    // SidebarComponent
  ],
  exports: [
  	GrPanelComponent, 
  	// FooterComponent, 
  	// SidebarComponent
  ]
})
export class GrPanelModule { }
