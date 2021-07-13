import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { tap } from 'rxjs/operators';

import { GlobalsService } from '../../../../../../../shared';
import { ProjectTypeService } from './project-type.service';
import { RefProjectTypeService } from '../ref-project-type.service';

@Component({
  selector: 'app-project-project-type-form',
  templateUrl: './project-type-form.component.html',
  styleUrls: ['./project-type-form.component.scss']
})
export class ProjectTypeFormComponent implements OnInit {

	form: FormGroup;
  isEdit(): boolean {
    return this.projectTypeS.projectType.getValue() !== null;
  }

  @Output() refreshRefProjectType = new EventEmitter<any>();

  constructor(
    private projectTypeS: ProjectTypeService,
    private refProjectTypeS: RefProjectTypeService,
    private globalsS: GlobalsService,
  ) { }

  ngOnInit() {
    this.form = this.projectTypeS.form;

    this.projectTypeS.refProjectType = this.refProjectTypeS.refProjectType.getValue();
  }

  save() {
    this.projectTypeS.submit()
      .pipe(
        tap(() => this.globalsS.snackBar({msg: "Enregistrement effectué"}))
      )
      .subscribe(
        () => this.refreshRefProjectType.emit(),
        (err) => {
          let msg = err.error.violations.map(v => v.message);
          this.globalsS.snackBar({msg: msg.join("\n"), color: 'red', duration: null});
        }
      );
  }

  cancel() {
    this.projectTypeS.reset();
    this.projectTypeS.moveStepper(0);
  }
}
