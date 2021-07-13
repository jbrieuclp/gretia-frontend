import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { ConventionsRepository, Convention, ProjectFunding } from '../../../../repository/conventions.repository';
import { Projet } from '../../../../repository/projet.repository';
import { ConventionService } from '../convention.service';

@Component({
  selector: 'app-project-convention-project-fundings',
  templateUrl: './project-fundings.component.html',
  styleUrls: ['../table.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

	public totalItems: number = 0;
	private _projectFundings: ProjectFunding[] = [];
  set projectFundings(values: ProjectFunding[]) { this._projectFundings = values; };
  get projectFundings(): ProjectFunding[] { return this._projectFundings.filter(v => v !== null); };
	public loadingList: boolean = false;
	get total(): number {
    let total = 0;
    this.projectFundings.forEach(f => total += f.eligibleFunding);
    return total;
  };

  public _subscriptions: Subscription[] = [];

  constructor(
  	private conventionR: ConventionsRepository,
  	private conventionS: ConventionService,
  ) { }

  ngOnInit() {
    registerLocaleData( fr );
    this._subscriptions.push(
    	this.conventionS.convention.asObservable()
    		.pipe(
    			filter((convention: Convention) => convention !== null),
    			switchMap((convention: Convention): Observable<ProjectFunding[]> => this.getProjectFundings(convention.id)),
    		)
    		.subscribe((projectFundings: ProjectFunding[]) => this._projectFundings = projectFundings)
    );
  }

  getProjectFundings(convention_id): Observable<ProjectFunding[]> {
  	this.loadingList = true;
  	return this.conventionR.conventionProjectFundings(convention_id)
  		.pipe(
  			tap((data: any) => this.totalItems = data["hydra:totalItems"]),
        map((data: any): ProjectFunding[] => data["hydra:member"]),
        tap(() => this.loadingList = false),
  		);
  }

  projectFundingChange([id, projectFunding]) {
    const index = this._projectFundings.findIndex(f => f['@id'] === id);
    this._projectFundings[index] = projectFunding;
  }

  projectFundingCreate(projectFunding) {
    this._projectFundings.push(projectFunding);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => { s.unsubscribe(); });
  }

}
