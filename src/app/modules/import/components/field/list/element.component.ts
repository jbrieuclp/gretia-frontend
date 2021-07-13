import { Component, OnInit, Input, Output, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, map, startWith, distinctUntilChanged, switchMap, catchError, retry, filter } from 'rxjs/operators';

import { FieldService } from '../field.service';
import { ImportService } from '../../../services/import.service';
import { ViewTableDialog } from './view-table.dialog';

@Component({
  selector: '[app-import-field-element]',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

	@Input() value: any;
	@Output() valueChange = new EventEmitter<any>();
	field: any = null;
  syncIcon: boolean = true;

  constructor(
  	public dialog: MatDialog,
  	private fieldS: FieldService
  ) { }

  ngOnInit() {
    this.fieldS.field.subscribe(field=>this.field = field);
    this.syncIcon = this.value.ban === "true";
  }

  get syncTooltip() {
    return this.syncIcon ? 
            'Mettre de côté les données liées à cette valeur' :
            'Réintégrer les données liées à cette valeur';
  }

  switchSynchonisation() {

  }

  editDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {initial_value: this.value.value};
  	dialogConfig.maxWidth = '100%';
  	dialogConfig.width = '90%';
  	dialogConfig.height = '90%';
  	dialogConfig.position = {left: '5%', top: '30px'};

  	if (this.field.fieldFSD.type === 'radio') {
    	const dialogRef = this.dialog
    													.open(EditRadioDialog, dialogConfig)
    													.afterClosed()
															  .subscribe(response => {
															  	if (response) {
																  	this.value.value = response;
																  	this.value.ok = true;
																  	this.valueChange.emit(this.value);
															  	}
															  });
  	} else if (this.field.fieldFSD.type === 'autocomplete') {
  		const dialogRef = this.dialog
    													.open(EditAutocompleteDialog, dialogConfig)
    													.afterClosed()
															  .subscribe(response => {
															  	if (response) {
																  	this.value.value = response;
																  	this.value.ok = true;
																  	this.valueChange.emit(this.value);
															  	}
															  });
  	} else {
  		const dialogRef = this.dialog
    													.open(EditInputDialog, dialogConfig)
    													.afterClosed()
															  .subscribe(response => {
															  	if (response) {
																  	this.value.value = response;
																  	this.value.ok = true;
																  	this.valueChange.emit(this.value);
															  	}
															  });
  	}
  }

  tableDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {search: this.value.value};
    dialogConfig.maxWidth = '100%';
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = {left: '5%', top: '30px'};

    const dialogRef = this.dialog
                            .open(ViewTableDialog, dialogConfig);

  }

}





/**********
* Input DIALOG
**********/
@Component({
  selector: 'app-import-field-element-edit-input-dialog',
  templateUrl: 'input.dialog.html',
  styleUrls: ['./dialog.scss']
})
export class EditInputDialog implements OnInit {

	field: any;
	input: string;

  constructor (
    public dialogRef: MatDialogRef<EditInputDialog>,
    private fieldS: FieldService,
    private importS: ImportService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() { 
  	this.fieldS.field.subscribe(field=>this.field = field);
  	this.input = this.data.initial_value;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submit() {
  	let request = {old: this.data.initial_value, new: this.input};
  	this.importS.patchFieldValue(this.field.id, request)
  									.subscribe(
  										result => {
  											this.dialogRef.close(result);
  										},
  										error => { 
  											this._snackBar.open(error.error.message, 'Fermer', {
										      duration: 4000,
										      verticalPosition: 'top'
										    }); 
	  									})
  }

}

/**********
* Autocomplete DIALOG
**********/
@Component({
  selector: 'app-import-field-element-edit-autocomplete-dialog',
  templateUrl: 'autocomplete.dialog.html',
  styleUrls: ['./dialog.scss']
})
export class EditAutocompleteDialog implements OnInit {

	field: any;
  searchTerm$ = new Subject<any>();
  isOpen: boolean = false;
  isWaiting: boolean = false;
  autocomplete: any[] = [];
  text_autocomplete: string;

  constructor (
    public dialogRef: MatDialogRef<EditAutocompleteDialog>,
    private fieldS: FieldService,
    private importS: ImportService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() { 
  	this.fieldS.field.subscribe(field=>this.field = field);
  	this.text_autocomplete = this.data.initial_value;

    this.searchTerm$
      .pipe(
        startWith(this.text_autocomplete),
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
          this.isWaiting = true; 
          this.autocomplete = []; 
          return term.length > 3 ?
            this.importS.searchFSDValues(this.field.fieldFSD.id, term) : of([]);
        })
      )
      .subscribe((results: any[]) => {
        this.isWaiting = false;
        this.autocomplete = results;
      });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submit() {
  	let request = {old: this.data.initial_value, new: this.text_autocomplete};
  	this.importS.patchFieldValue(this.field.id, request)
  									.subscribe(
  										result => {
  											this.dialogRef.close(result);
  										},
  										error => { 
  											this._snackBar.open(error.error.message, 'Fermer', {
										      duration: 4000,
										      verticalPosition: 'top'
										    }); 
	  									})
  }
}

/**********
* Radio DIALOG
**********/
@Component({
  selector: 'app-import-field-element-edit-radio-dialog',
  templateUrl: 'radio.dialog.html',
  styleUrls: ['dialog.scss']
})
export class EditRadioDialog implements OnInit {

	field: any;
	radioValues: string[];
  filterRadioValues: Observable<string[]>;
	selectedValue: string;
	new_value: string;
  waiting: boolean = false;
  filterControl = new FormControl();

  constructor (
    public dialogRef: MatDialogRef<EditRadioDialog>,
    private fieldS: FieldService,
    private importS: ImportService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.fieldS.field.subscribe(field=>{
      this.field = field;
      this.getFSDFieldValues();
    });
  	
  }

  getFSDFieldValues() {
    this.importS.getFSDFieldValues(this.field.fieldFSD.id)
                  .subscribe(values => {
                    this.radioValues = values;
                    this.initFilter();
                  });
  }

  initFilter() {
    this.filterRadioValues = this.filterControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.radioValues.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submit() {
    this.waiting = true;
  	let request = {old: this.data.initial_value, new: this.selectedValue};
  	this.importS.patchFieldValue(this.field.id, request)
  									.subscribe(
  										result => {
  											this.dialogRef.close(result);
  										},
  										error => { 
  											this._snackBar.open(error.error.message, 'Fermer', {
										      duration: 4000,
										      verticalPosition: 'top'
										    }); 
	  									},
                      () => this.waiting = false
                    );
  }

}




