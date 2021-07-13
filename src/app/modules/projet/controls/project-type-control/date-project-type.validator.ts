import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';

import { ProjectTypeRepository, ProjectType } from '../../repository/project-type.repository';

export function dateProjectTypeValidator(compared: string, projectTypes): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } => {
        const valeur = control.value
        const group = control.parent;
        let valid = true;
        if (group !== undefined && valeur !== null && projectTypes) {
            console.log(projectTypes)
            const idx = projectTypes.findIndex(e => e['@id'] == valeur);
            console.log(group, control, idx)
        	const comparedDate = group.controls[compared].value;
            console.log(
                moment(comparedDate).format('YYYY-MM-DD'), 
                moment(valeur.applicationDebut).format('YYYY-MM-DD'), 
                moment(valeur.applicationFin).format('YYYY-MM-DD'), 
                moment(comparedDate).isBetween(moment(valeur.applicationDebut), moment(valeur.applicationFin))
            );
        	valid = moment(comparedDate).isBetween(moment(valeur.applicationDebut), moment(valeur.applicationFin));
        }

		return valid ? null : { 'dateProjectTypeError': true };
	};
}


export const dateProjectTypeAsyncValidator = 
  (compared: string, projectTypeR: ProjectTypeRepository) => {
    return (control: FormControl) => {
      //recuperation du formulaire parent
      const group = control.parent;
      if (!group || control.value === null) {
        return of(null);
      }

      return projectTypeR.get(control.value)
              .pipe(
                map(res => {
                  if (
                    moment(group.controls[compared].value).isSameOrAfter(res.applicationDebut) &&
                    moment(group.controls[compared].value).isSameOrBefore(res.applicationFin||[])
                  ) {
                    return null;
                  } else {
                    return {'dateProjectTypeError': true}
                  }
                })
              );
    };
  };