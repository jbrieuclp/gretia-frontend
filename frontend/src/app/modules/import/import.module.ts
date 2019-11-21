import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatBottomSheetModule
 } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//modules
import { ImportRoutingModule } from './import-routing.module';

//components
import { FilesListComponent } from './components/file/list/list.component';
import { ImportInitComponent } from './import-init.component';
import { FileDashboardComponent } from './components/file/dashboard/dashboard.component';
import { FileMapperComponent } from './components/file/mapper/mapper.component';
import { FormMapperComponent } from './components/file/mapper/form-mapper.component';
import { FieldListComponent } from './components/field/list/list.component';
import { ElementComponent } from './components/field/list/element.component';
import { EditInputDialog } from './components/field/list/element.component';
import { EditAutocompleteDialog } from './components/field/list/element.component';
import { EditRadioDialog } from './components/field/list/element.component';
import { FieldObserversComponent } from './components/field/observers/observers.component';
import { EditObserverComponent } from './components/field/observers/edit-observer.component';
import { ToolsboxComponent } from './components/field/toolsbox/toolsbox.component';

//services
import { ImportService } from './services/import.service';
import { FormMapperService } from './components/file/mapper/form-mapper.service';
import { FieldService } from './components/field/field.service';

//directives
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
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
    ImportRoutingModule,
    NgbModule
  ],
  declarations: [
    ImportInitComponent,
    FilesListComponent,
    FileDashboardComponent,
    FileMapperComponent,
    FormMapperComponent,
    FieldListComponent,
    ElementComponent,
    EditInputDialog,
    EditAutocompleteDialog,
    EditRadioDialog,
    FieldObserversComponent,
    EditObserverComponent,
    ToolsboxComponent,
    AutofocusDirective
  ],
  entryComponents: [ 
    EditInputDialog,
    EditAutocompleteDialog,
    EditRadioDialog,
    ToolsboxComponent
  ],
  providers: [
    ImportService,
    FormMapperService,
    FieldService
  ],
  bootstrap: [FilesListComponent]
})
export class ImportModule { }