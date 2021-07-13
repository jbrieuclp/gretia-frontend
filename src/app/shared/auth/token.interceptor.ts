import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { catchError,tap} from 'rxjs/operators';

const WHITE_LIST = ['query.wikidata.org', 'taxref.mnhn.fr', 'nominatim.openstreetmap.org'];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService, 
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (WHITE_LIST.indexOf(this.extractHostname(request.url)) === -1) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.auth.getToken()
        }
      });
    }

    return next.handle(request)
              .pipe(
                tap(event => {
                  //if (event instanceof HttpResponse) {}
                }, error => {
                  if (error.status == 401) {
                    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url }});
                  }
                })
              );
  }


  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  } 

}