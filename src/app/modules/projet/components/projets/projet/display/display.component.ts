import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { ProjetService } from '../projet.service';
import { ProjetFormDialog } from '../form/projet-form.dialog';

@Component({
  selector: 'app-projet-projet-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ProjetDisplayComponent {

	get projet() {
		return this.projetS.projet.getValue();
	}

  get loading(): boolean {
    return this.projetS.loadingProject;
  }

  constructor(
  	private projetS: ProjetService,
    public dialog: MatDialog,
  ) { }

  openFormDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '750px';
    // dialogConfig.position = {top: '70px'};
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ProjetFormDialog, dialogConfig);

    // dialogRef.afterClosed()
    //   .pipe(
    //     filter((res: boolean) => res)
    //   )
    //   .subscribe((val) => this.projetS.refreshCharges());
  }
}
