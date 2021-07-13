import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ConventionsRepository, Convention } from '../../repository/conventions.repository';

@Component({
  selector: 'app-conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.scss']
})
export class ConventionsComponent implements OnInit {

	public conventions: Convention[]
	public totalItems: number = 0;
  public loadingList: boolean = false;

  constructor(
  	private conventionsR: ConventionsRepository,
  ) { }

  ngOnInit() {
  	this.getConventions()
  		.subscribe((conventions: Convention[]) => this.conventions = conventions)
  }

  getConventions(): Observable<Convention[]> {
    this.loadingList = true;
    return this.conventionsR.conventions()
      .pipe(
        tap((data: any)=>this.totalItems = data["hydra:totalItems"]),
        map((data: any): Convention[]=>data["hydra:member"]),
        tap(() => this.loadingList = false)
      )
  }

}
