import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

 import { GrPanelComponent } from './gr-panel.component';
// import { FooterComponent } from './footer/footer.component';
// import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
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
