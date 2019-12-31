import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatTableModule,
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
  MatSnackBarModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatPaginatorModule,
  MatSortModule,
  MatTreeModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    LayoutModule
  ],
  declarations: [
    KeysPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    LayoutModule,
    KeysPipe
  ]
})
export class SharedModule { }
