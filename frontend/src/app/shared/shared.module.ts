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
  MatProgressBarModule,
  MatMenuModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';

//Dialog
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

//Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';

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
    MatMenuModule,
    LayoutModule
  ],
  declarations: [
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe,
    SortByPipe
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
    MatMenuModule,
    LayoutModule,
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe,
    SortByPipe
  ]
})
export class SharedModule { }
