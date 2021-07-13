import { Component, OnInit } from '@angular/core';

import { TaskService } from './task.service';

@Component({
  selector: 'app-projet-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  get task() { return this.taskS.task.getValue(); }

  constructor(
    private taskS: TaskService,
  ) { }

  ngOnInit() {
  }

}
