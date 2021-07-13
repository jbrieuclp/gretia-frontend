import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface NB_COLOR {
  background: string,
  text: string
}

@Injectable()
export class LayoutService {

	protected title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  protected navbarColor: BehaviorSubject<NB_COLOR> = new BehaviorSubject<NB_COLOR>({background: '#673ab7', text: '#fff'});
	protected sidenav: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor() { }

  public setLayout(layout: any) {
    if ( layout.title != null ) {
      this.setTitle(layout.title);
    }

    if ( layout.navbarColor != null ) {
      this.setNavbarColor(layout.navbarColor);
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

  public setNavbarColor(color: NB_COLOR) {
    this.navbarColor.next(color);
  }

  public getNavbarColor(): NB_COLOR {
    return this.navbarColor.value;
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
