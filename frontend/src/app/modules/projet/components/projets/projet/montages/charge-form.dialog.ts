import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map, tap, filter } from 'rxjs/operators';
import { ProjetRepository, Projet, Charge } from '../../../../repository/projet.repository';
import { ChargeTypeRepository, ChargeType } from '../../../../repository/charge-type.repository';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-projet-projet-display-charge-form',
  templateUrl: './charge-form.dialog.html',
  styleUrls: ['./charge-form.dialog.scss']
})
export class ChargeFormDialog implements OnInit {

	public form: FormGroup;
  charge: Charge = null;
  waiting: boolean = false;

	get projet(){
    return this.projetS.projet.getValue();
  }

  constructor(
    public dialogRef: MatDialogRef<ChargeFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  	private fb: FormBuilder,
  	private projetS: ProjetService,
  	private chargeTypeR: ChargeTypeRepository,
  	private projetR: ProjetRepository,
  ) {
    this.charge = data.charge;
  }

  ngOnInit() {
  	this.initForm();
  	this.setObservables();
  }

  private get initialValues(): Charge {
    return {unitCostApplied: 1};
  }

  initForm(): void {
    //FORM
    this.form = this.fb.group({
      label: [null, Validators.required],
      description: [null],
      unitCostApplied: [null, Validators.required],
      quantity: [null, Validators.required],
      chargeType: [null, Validators.required],
      project: [null, Validators.required],
    });

    if (this.charge !== null) {
      this.form.patchValue(this.charge);
    } else {
      this.form.patchValue(this.initialValues);
    }
  }

  /**
   * Initialise les observables pour la mise en place des actions automatiques
   **/
  private setObservables() {

  	this.projetS.projet.asObservable()
  		.pipe(
  			tap(() => this.form.get('project').setValue(null)),
  			filter((project: Projet) => project !== null)
  		)
  		.subscribe((project: Projet) => this.form.get('project').setValue(project['@id']));

  	this.form.get('chargeType').valueChanges
  		.pipe(
        filter((val: any) => typeof val === 'string' || val instanceof String),
  			tap(()=> this.form.get('unitCostApplied').disable()),
  			filter((val: string) => val !== null),
  			map((chargeType: string): string => {
  				const regex = /([0-9]+)$/;
					const corresp = regex.exec(chargeType);
					return corresp[0];
  			}),
  			switchMap((chargeType: string): Observable<ChargeType> => this.chargeTypeR.chargeType(chargeType)),
  			tap(()=>this.form.get('unitCostApplied').enable()),
  			map((chargeType: ChargeType) => chargeType.chargeTypeRef.isPerDay ? this.projet.projectType.coutJour : chargeType.unitCost),
  		)
  		.subscribe(val=>this.form.get('unitCostApplied').setValue(val));
  }

  submit(): void { 	
    if ( !this.form.valid ) {
      return;
    }

    this.waiting = true;
    let api;

    if (this.charge === null) {
      //create
      api = this.projetR
        .createCharge(this.form.value)
        .pipe(
        	tap((): void => {
            this.form.reset(this.initialValues);
        	})
        );
    } else {
      //update
      api = this.projetR
        .updateCharge(this.charge.id, this.form.value)
        .pipe(
          tap((): void => {
            this.form.reset(this.initialValues);
          })
        );
    }

    api
      .pipe(
        tap(()=>this.waiting = false)
      )
      .subscribe(
          (charge: Charge) => this.dialogRef.close(charge),
          (err) => {
            //this._commonService.translateToaster("error", "ErrorMessage");
          }
        );
  }

  cancel() {
    this.form.reset(this.initialValues); 
    this.dialogRef.close(false);
  }
}
