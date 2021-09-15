import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';

@Injectable()
export class EnsureSSLInterceptor implements HttpInterceptor {
  /**
   * Credit: https://angular.io/guide/http#http-interceptors
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const secureReq = req.clone({
      url: req.url.replace('http://', 'http://'),
    });

    return next.handle(secureReq);
  }
}
