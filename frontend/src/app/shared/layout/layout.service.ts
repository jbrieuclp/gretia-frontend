import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LayoutService {

	protected title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	protected sidenav: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor() { }

  public setLayout(layout: any) {
    if ( layout.title != null ) {
      this.setTitle(layout.title);
    }

    if ( layout.sidenav != null ) {
      this.setSidenav(layout.sidenav);
    }
  }

  public setTitle(title: string) {
    this.title.next(title);
  }

  public getTitle() {
    return this.title.value;
  }

  public setSidenav(sidenav: Array<any>) {
    this.sidenav.next(sidenav);
  }

  public getSidenav() {
    return this.sidenav.value;
  }

  public addSidenav(element: any) {
  	let sidenav = this.sidenav.value;
  	sidenav.push(element);
    this.sidenav.next(sidenav);
  }

  public hasSidenav() {
    if ( this.sidenav.value == null )
      return false;

    return this.sidenav.value.length ? true : false;
  }
}
