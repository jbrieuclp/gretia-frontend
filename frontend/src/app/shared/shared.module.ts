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
  MatMenuModule,
  MatSliderModule,
  MatSlideToggleModule
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

//Directives
import { ColorDifferenceDirective } from './directives/color-difference.directive';

//Services
import { GlobalsService } from './services/globals.service';
import { LoaderComponent } from './templates/loader/loader.component';
import { SubmitBtnComponent } from './templates/submit-btn/submit-btn.component';

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
    MatSliderModule,
    MatSlideToggleModule,
    LayoutModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe,
    SortByPipe,
    ColorDifferenceDirective,
    LoaderComponent,
    SubmitBtnComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    GlobalsService
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
    MatSliderModule,
    MatSlideToggleModule,
    LayoutModule,
    ConfirmationDialogComponent,
    KeysPipe,
    TimeFormatPipe,
    SortByPipe,
    ColorDifferenceDirective,
    LoaderComponent,
    SubmitBtnComponent
  ]
})
export class SharedModule { }
