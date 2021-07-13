import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { SuiveuseService } from '../suiveuse.service';
import { WorksRepository, Work } from '../../../repository/works.repository';
import { WorkService } from './work.service';

@Component({
  selector: 'app-projet-suiveuses-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

	get selectedDate() { return this.suiveuseS.selectedDate; }
  get works(): Work[] { return this.workS.works; }
  get loading(): boolean { return this.workS.loading; }

  constructor(
  	private suiveuseS: SuiveuseService,
    private workS: WorkService,
  ) { }

  ngOnInit() {
  	
  }

  displayTime(time: number): string {
    const hour = Math.floor(time/60);
    const minute = (time % 60) < 10 ? `0${time % 60}` : time % 60;
    return `${hour}h${minute}`;
  }

}
