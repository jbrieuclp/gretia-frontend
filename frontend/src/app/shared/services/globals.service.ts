import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalsService {

	protected title: BehaviorSubject<string> = new BehaviorSubject<string>('Apps du Gretia');
	protected sidenav: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([{title: 'Accueil', url: '/', img: 'home', tooltip: 'Accueil'}]);

  constructor() { }

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
}
