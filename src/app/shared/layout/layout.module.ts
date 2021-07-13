import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
   MatToolbarModule,
   MatButtonModule,
   MatListModule,
   MatIconModule,
   MatMenuModule,
   MatTooltipModule,
   MatCardModule,
   MatFormFieldModule,
   MatProgressSpinnerModule,
   MatInputModule,
   MatSnackBarModule
 } from '@angular/material';

import { AuthService } from '../auth/authentication.service';
import { LayoutService } from './layout.service';

import { HeaderComponent } from './header/header.component';
import { SignInDialog } from './header/sign-in.dialog';
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
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
  	HeaderComponent, 
  	FooterComponent, 
  	SidebarComponent,
    SignInDialog
  ],
  exports: [
  	HeaderComponent, 
  	FooterComponent, 
  	SidebarComponent,
    SignInDialog
  ],
  entryComponents: [ 
    SignInDialog
  ],
  providers: [
    AuthService,
    LayoutService
  ]
})
export class LayoutModule { }
