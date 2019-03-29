import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { 
   MatToolbarModule,
   MatButtonModule,
   MatListModule,
   MatIconModule,
   MatMenuModule,
   MatTooltipModule
 } from '@angular/material';

import { AuthService } from '../auth/authentication.service';
import { LayoutService } from './layout.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule
  ],
  declarations: [
  	HeaderComponent, 
  	FooterComponent, 
  	SidebarComponent
  ],
  exports: [
  	HeaderComponent, 
  	FooterComponent, 
  	SidebarComponent
  ],
  providers: [
    AuthService,
    LayoutService
  ]
})
export class LayoutModule { }
