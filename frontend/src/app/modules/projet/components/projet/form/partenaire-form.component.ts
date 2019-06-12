import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { OrganismeRepository } from '../../../repository/organisme.repository';
import { Projet, Organisme, ProjetRepository } from '../../../repository/projet.repository';

interface DATA {
  projet: Projet,
  partenaires: Organisme[],
  type: string
}

@Component({
  selector: 'app-projet-projet-partenaire-form',
  templateUrl: './partenaire-form.component.html'
})
export class PartenaireFormComponent implements OnInit {

	orgFormDisplay: boolean = false;
  form: FormGroup;
  searchTerm$ = new Subject<any>();
	isWaiting: boolean = false;
  autocomplete: Array<any>= [];

  constructor( 
    private fb: FormBuilder, 
    private orgaR: OrganismeRepository,
    private projetR: ProjetRepository,
    public dialogRef: MatDialogRef<PartenaireFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DATA
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      organisme: [null, [Validators.required]],
    });
  	//callback d'attente
    this.searchTerm$
      .subscribe(res => {
        this.autocomplete = []; 
        this.isWaiting = true; 
      });

    //callback de resultat, est executé à l'initiation mais observe la variable searchTerm$ coté repository
    this.orgaR.search(this.searchTerm$)
      .subscribe(results => {
        this.isWaiting = false;
        this.autocomplete = results;
      });
  }

  displayFn(organisme: Organisme): string {
    return (organisme !== null) ? organisme.nom : null;
	}

  save() {
    if (this.form.valid) {
      this.addOrganisme(this.form.value.organisme)
    }
  }

  addOrganisme(organisme) {
    if (this.data.type == 'f') {
      this.projetR.addPartFinanciers(this.data.projet.id, organisme.id)
                   .subscribe(organismes => this.dialogRef.close(organismes));
    } else if (this.data.type == 't') {
      this.projetR.addPartTechniques(this.data.projet.id, organisme.id)
                   .subscribe(organismes => this.dialogRef.close(organismes));
    }
  }

  cancel(): void {
    this.dialogRef.close(this.data.partenaires);
  }

  orgSave(organisme){
    console.log(organisme);
    this.addOrganisme(organisme)
  }

}
