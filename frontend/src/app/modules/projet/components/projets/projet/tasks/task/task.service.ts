import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../../../../../repository/task.repository';

@Injectable()
export class TaskService {

  task: BehaviorSubject<Task> = new BehaviorSubject(null);
  displayTaskForm: boolean = false;

  constructor(

  ) { 

  }

}
