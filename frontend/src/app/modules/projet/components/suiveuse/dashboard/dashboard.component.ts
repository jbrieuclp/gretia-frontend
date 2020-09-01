import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Personne, PersonRepository } from '../../../repository/person.repository';
import { SuiveuseService } from '../suiveuse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user: Observable<Personne>;
	personMissions: any[] = [];

  constructor(
  	private personR: PersonRepository,
  	private suiveuseS: SuiveuseService,
  ) { }

  ngOnInit() {
  	this.user = this.suiveuseS.user;
  	this.suiveuseS.user.asObservable()
	  	.pipe(
        filter((user: Personne)=>user !== null),
        switchMap((user: Personne)=>this.personR.getMissions(user.id)),
      )
      .subscribe((personMissions: any[])=>this.personMissions = personMissions);
  }

  displayTime(time) {
    return time !== undefined ? Math.trunc(time/60) + "h" + (time%60 !== 0 ? time%60 :'') : "-";
  }
}
