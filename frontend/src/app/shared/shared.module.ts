import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { 
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    LayoutModule
  ],
  declarations: [ 
    ConfirmationDialogComponent 
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    LayoutModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
