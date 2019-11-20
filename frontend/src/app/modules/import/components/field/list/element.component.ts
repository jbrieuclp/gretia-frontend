import { Component, OnInit, Input, Output, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, map, startWith, distinctUntilChanged, switchMap, catchError, retry } from 'rxjs/operators';

import { FieldService } from '../field.service';
import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import-field-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {

	@Input() value: any;
	@Output() valueChange = new EventEmitter<any>();
	@Input() state: 'danger'|'success';
	field: any;

  constructor(
  	public dialog: MatDialog,
  	private fieldS: FieldService
  ) {
  	this.field = this.fieldS.field.getValue();
  }

  editDialog(): void {

  	const dialogConfig = new MatDialogConfig();

  	dialogConfig.data = {initial_value: this.value.value};
  	dialogConfig.maxWidth = '100%';
  	dialogConfig.width = '90%';
  	dialogConfig.height = '90%';
  	dialogConfig.position = {left: '5%', top: '30px'};

  	if (this.field.fieldFSD.type === 'radio') {
    /*	const dialogRef = this.dialog
    													.open(EditRadioDialog, dialogConfig)
    													.afterClosed()
															  .subscribe(response => {
															  	if (response) {
																  	this.value.value = response;
																  	this.value.ok = true;
																  	this.valueChange.emit(this.value);
															  	}
															  });*/
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
  	this.field = this.fieldS.field.getValue();
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
  	this.field = this.fieldS.field.getValue();
  	this.text_autocomplete = this.data.initial_value;

  	//callback d'attente
    this.searchTerm$
      .subscribe(res => {
        this.autocomplete = []; 
        this.isWaiting = true; 
      });

    //callback de resultat
    this.searchTaxons(this.searchTerm$)
      .subscribe((results: any[]) => {
        this.isWaiting = false;
        this.autocomplete = results;
      });

  }

  // ngOnDestroy() {
  // 	this.searchTerm$.unsubscribe();
  // 	this.searchTaxons.unsubscribe();
  // }

  /* GET taxon whose name contains search term */
	searchTaxons(terms: Observable<string>): Observable<any[]> {
	  return terms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap(term => {
        	return term.length > 3 ?
         		this.importS.searchFSDValues(this.field.fieldFSD.id, term) : of([]);
        })
      );
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
	selectedValue: string;
	new_value: string;

  constructor (
    public dialogRef: MatDialogRef<EditRadioDialog>,
    private fieldS: FieldService,
    private importS: ImportService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  	this.field = this.fieldS.field.getValue();
  }

  ngOnInit() {
  	this.importS.getFSDFieldValues(this.field.fieldFSD.id).subscribe(values => this.radioValues = values)
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submit() {
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
	  									})
  }

}