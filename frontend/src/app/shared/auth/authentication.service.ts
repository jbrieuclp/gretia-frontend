import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpParams, 
  HttpHeaders, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { throwError } from 'rxjs';
import { 
  debounceTime, 
  map, 
  distinctUntilChanged, 
  switchMap, 
  catchError, 
  retry
} from 'rxjs/operators'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
//import { HttpClient, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt'

import { AppConfig } from '../app.config';

import { User } from '../models/user.model';

const ANONYMOUS_USER: User = new User().deserialize({
                        id: null,
                        username: null,
                        lastLogin: null,
                        token: null,
                        expires_at: null
                       });

@Injectable()
export class AuthService {

  protected authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  httpUrlBase: string;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.setSession(null);
    this.httpUrlBase = AppConfig.URL_API;
  }

  login(user: any): Observable<any> {
  	const url = this.httpUrlBase + '/login_check';
    return this.http
    	.post<User>(url, user)
    	.pipe(
        map((user: User) => { 
          let newUser = new User().deserialize(user);
          this.setSession(newUser);
          return newUser;
        })
      );
  }


  signIn(val: any): Observable<any> {
    const url = this.httpUrlBase + '/inscription';
    return this.http
      .post<User>(url, val)
      .pipe(
        map((user): User => { 
          let newUser = new User().deserialize(user);
          this.setSession(newUser);
          return newUser;
        }),
        catchError((res: HttpErrorResponse) => this.handleError(res))
      );
  }

  private setSession(user: User) {
    if (user === null) {

      if ( localStorage.getItem("user") !== "undefined" ) 
        user = new User().deserialize(JSON.parse(localStorage.getItem("user")));

      if ( user instanceof User && !user.isExpired() ) {
        user = new User().deserialize(JSON.parse(localStorage.getItem("user")));
      } else {
        user = ANONYMOUS_USER;
      }

    } else {
      localStorage.setItem('id_token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem("expires_at", JSON.stringify(user.expires_at));
    }
    this.authenticatedUser.next(user);
  }          

  public logout() {
    let newUser = ANONYMOUS_USER;
    this.setSession(newUser);
  }

  public getUser(): Observable<User> {
    return this.authenticatedUser;
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public getToken(): string {
    return localStorage.getItem('id_token') !== "undefined" ? localStorage.getItem('id_token') : null;
  }

  private handleError(res: HttpErrorResponse) { 
    var errMsg = '';
    if (Array.isArray(res.error) && res.error.length > 0) {
      errMsg = '';
      for (var i = 0; i < res.error.length; i++) {
        errMsg += res.error[i].message;
        if (res.error.length - 1 > i) {
          errMsg += " - ";
        }
      }
    } else {
      errMsg = (res.error.message) ? res.error.message : res.error.status ? `${res.error.status} - ${res.error.statusText}` : 'Server error';
    }
    return throwError(errMsg);
  }
  
}