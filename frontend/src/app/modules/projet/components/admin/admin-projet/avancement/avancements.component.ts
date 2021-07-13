import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Avancement } from '../../../../repository/task.repository';
import { AvancementService } from './avancement.service';

@Component({
  selector: 'app-projet-admin-avancements',
  templateUrl: './avancements.component.html',
  styleUrls: ['../../../css/list-display.scss']
})
export class AvancementsComponent implements OnInit {

	get avancements(): Avancement[] {
    return this.avancementS.avancements;
  }
  @ViewChild('stepper') private stepper: MatStepper;

  get avancement() {
    return this.avancementS.avancementSelect.getValue();
  }

  constructor(
  	private avancementS: AvancementService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.avancementS.stepper = this.stepper;
  }

  select(avancement: Avancement) {
    this.avancementS.moveStepper(0);
    this.avancementS.avancementSelect.next(avancement);
  }

  addAvancement() {
    this.avancementS.avancementSelect.next(null);
    this.avancementS.moveStepper(1);
  }
}
