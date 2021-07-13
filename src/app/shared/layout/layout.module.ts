import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
