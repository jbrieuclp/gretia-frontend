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
  MatTreeModule,
  MatSelectModule,
  MatDatepickerModule,
  MatProgressBarModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { KeysPipe } from './pipes/keys.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';

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
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    LayoutModule
  ],
  declarations: [
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe
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
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    LayoutModule,
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe
  ]
})
export class SharedModule { }
