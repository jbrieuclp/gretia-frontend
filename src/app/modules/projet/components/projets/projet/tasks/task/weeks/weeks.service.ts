import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Week } from '../../../../../../repository/task.repository';

@Injectable()
export class WeeksService {

  week: BehaviorSubject<Week> = new BehaviorSubject(null);
  weekTooltip: string;

  constructor() { }

}
