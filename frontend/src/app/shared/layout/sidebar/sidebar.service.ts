import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SidebarService {

  private isLock = new BehaviorSubject<boolean>(false);
  currentState = this.isLock.asObservable();

  constructor() { }

  changeState(state: boolean) {
    this.isLock.next(state)
  }
}