import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, Inject  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Taxon } from '../../../models/taxon.model';
import { Change } from '../../../models/change.model';
import { TaxonRepository } from '../../../models/repositories/taxon.repository';
import { FicheService } from '../fiche.service';

const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-magictaxref-fiche-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FicheDetailComponent implements OnInit {

  fileNameDialogRef: MatDialogRef<ChangementInfoComponent>;

  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
   };
   
  get taxon(): Taxon { return this.ficheS.taxon.getValue(); };

  constructor(
    private _eref: ElementRef, 
    private dialog: MatDialog,
    private ficheS: FicheService,
  ) { }

  ngOnInit() { 
    console.log(this.taxon);
  }

  openChangeDialog(version) {
    this.fileNameDialogRef = this.dialog.open(ChangementInfoComponent, {
      hasBackdrop: true,
      width: '70%',
      data: {taxon: this.taxon, version: version}
    });
  }

  isCodeTaxon(val){
    return RegExp('^[0-9]{2,}$').test(val);
  }

  isUrl(val){
    return RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$', 'g').test(val);
  }
}



@Component({
  templateUrl: './changement-info.component.html',
  providers: [ TaxonRepository ]
})
export class ChangementInfoComponent {

  changes: Array<Change>;

  constructor(
    private dialogRef: MatDialogRef<ChangementInfoComponent>,
    private _tr: TaxonRepository,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.changes = [];
  }

  ngOnInit() {
    this.getChangement(this.data);
  }

  getChangement(data: any): void {
    this._tr.getChangement(data.taxon.cd_nom, data.version)
      .subscribe((changes: Change[]) => {
        this.changes = changes;
      });
  }

}