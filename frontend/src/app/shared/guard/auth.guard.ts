import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/authentication.service';

import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  user: User;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.getUser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user.isAuthenticated()) {
      return true;
    }  else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

  getUser() {
    return this.auth.getUser()
      .subscribe(
        user => {this.user = user;}
      );
  }
}