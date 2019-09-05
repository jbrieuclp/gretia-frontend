import { Injectable } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Personne, PersonRepository } from '../../repository/person.repository';

@Injectable()
export class SuiveuseService {

  protected _user: BehaviorSubject<Personne> = new BehaviorSubject(null);
  httpUrlBase: string;

  constructor(
    private personR: PersonRepository,
    private router: Router
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(truc=>this.checkRoute())
  }

  checkRoute() {
    let route = this.router.routerState.root;
    while (route.firstChild && route.snapshot.paramMap.get('person') === null ) {
      route = route.firstChild;
    }
    this.user = route.snapshot.paramMap.get('person');
  }

  set user(user) {
    this.personR.getUser(user).subscribe(person=>this._user.next(person));
  }

  get user(): any {
    return this._user;
  }

  clearUser() {
    this._user.next(null);
  }  
}