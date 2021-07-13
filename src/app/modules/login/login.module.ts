import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

//modules
import { LoginRoutingModule } from './login-routing.module';

//components
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    LoginRoutingModule
  ],
  declarations: [
  	SigninComponent,
  	LoginComponent
  ]
})
export class LoginModule { }
