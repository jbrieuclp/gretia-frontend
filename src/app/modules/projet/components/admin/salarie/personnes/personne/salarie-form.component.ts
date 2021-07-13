import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { SalarieService } from './salarie.service';
import { PersonneService } from '../personne.service';

@Component({
  selector: 'app-projet-person-salarie-form',
  templateUrl: './salarie-form.component.html',
  styleUrls: ['./salarie-form.component.scss']
})
export class SalarieFormComponent implements OnInit {

	form: FormGroup;
  isEdit(): boolean {
    return this.salarieS.salarie.getValue() !== null;
  }

  @Output() refreshPerson = new EventEmitter<any>();

  constructor(
    private salarieS: SalarieService,
    private personneS: PersonneService,
    private globalsS: GlobalsService,
  ) { }

  ngOnInit() {
    this.form = this.salarieS.form;

    this.salarieS.personne = this.personneS.personne.getValue();
  }

  save() {
    this.salarieS.submit()
      .pipe(
        tap(() => this.globalsS.snackBar({msg: "Enregistrement effectué"}))
      )
      .subscribe(
        () => this.refreshPerson.emit(),
        (err) => {
          let msg = err.error.violations.map(v => v.message);
          this.globalsS.snackBar({msg: msg.join("\n"), color: 'red', duration: null});
        }
      );
  }

  cancel() {
    this.salarieS.reset();
    this.salarieS.moveStepper(0);
  }
}
