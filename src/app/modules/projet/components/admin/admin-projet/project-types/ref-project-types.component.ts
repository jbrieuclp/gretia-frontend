import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { RefProjectType } from '../../../../repository/project-type.repository';
import { RefProjectTypeService } from './ref-project-type.service';

@Component({
  selector: 'app-project-admin-ref-project-types',
  templateUrl: './ref-project-types.component.html',
  styleUrls: ['../../../css/list-display.scss']
})
export class RefProjectTypesComponent implements OnInit {

	get refProjectTypes(): RefProjectType[] {
    return this.refProjectTypeS.refProjectTypes;
  }
  private id: string;

  @ViewChild('stepper', { static: true }) private stepper: MatStepper;

  constructor(
  	public refProjectTypeS: RefProjectTypeService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    combineLatest(
      this.route.params.pipe(
        map(p => p.refProjectType), //nom du parametre dans le routing.module
        filter(id => id !== undefined),
        tap(id => this.id = id.toString()),
      ),
      this.refProjectTypeS._refProjectTypes.asObservable()
    )
      .pipe(
        map(([id, refProjectTypes]): RefProjectType => refProjectTypes.find(refProjectType => refProjectType.id == id)),
        filter((refProjectType: RefProjectType) => refProjectType !== undefined)
      )
      .subscribe((refProjectType: RefProjectType) => this.refProjectTypeS.refProjectType.next(refProjectType));

    this.refProjectTypeS.stepper = this.stepper;
  }

  selected(refProjectType: RefProjectType) {
    let url = this.id ? this.router.url.replace(this.id, refProjectType.id.toString()) : `${this.router.url}/${refProjectType.id.toString()}`;
    this.router.navigateByUrl(url);
  }

  create() {
    this.refProjectTypeS.refProjectType.next(null);
    this.refProjectTypeS.moveStepper(1);
  }

  edit() {
    this.refProjectTypeS.moveStepper(1);
  }

  ngOnDestroy() {
    this.refProjectTypeS.refProjectType.next(null);
  }

}
