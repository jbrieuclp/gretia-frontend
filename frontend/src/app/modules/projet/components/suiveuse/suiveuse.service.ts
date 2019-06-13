import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Personne, PersonRepository } from '../../repository/person.repository';

@Injectable()
export class SuiveuseService {

  protected _user: Observable<Personne>;
  httpUrlBase: string;

  constructor(
    private personR: PersonRepository,
    private router: Router
  ) {
    let route = this.router.routerState.root;
    while (route.firstChild && route.snapshot.paramMap.get('person') === null ) {
      route = route.firstChild;
    }
    this.user = route.snapshot.paramMap.get('person');
  }

  set user(user) {
    this._user = this.personR.getUser(user);
  }

  get user(): any {
    this._user.subscribe(res => res);
  }
  
}