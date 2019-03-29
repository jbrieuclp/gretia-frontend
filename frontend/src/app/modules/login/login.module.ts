import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatFormFieldModule, 
  MatInputModule,
  MatCardModule,
  MatButtonModule, 
  MatCheckboxModule,
  MatIconModule,
  MatSelectModule,
  MatGridListModule,
  MatExpansionModule
} from '@angular/material';

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
    LoginRoutingModule
  ],
  declarations: [
  	SigninComponent,
  	LoginComponent
  ]
})
export class LoginModule { }
