import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { prefixReq } from './http-config';

@Injectable({ providedIn: 'root' })
export class CSRFInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
    // const clonedReq = req.clone({ setHeaders: { 'x-csrf-token': 'your-csrf-token-goes-here' } });
    // console.groupCollapsed(`${prefixReq} 🦹‍♀️ CSRF`);
    // console.log(`Adding CSRF header`);
    // console.groupEnd();
    // return next.handle(clonedReq);
  }
}
