import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { prefixReq, prefixRes } from './http-config';
import { AuthenService } from '../http/authen.service';

@Injectable()
export class ReadOnlyInterceptor implements HttpInterceptor {
  constructor(private sessionService: AuthenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const readOnly = this.sessionService.readOnly;
    if (!readOnly || this.okIfReadOnly(req)) {
      return next.handle(req);
    } else {
      const msg = `Can't ${req.method} ${req.url} when read-only`;
      return throwError(new Error(msg));
    }
  }

  okIfReadOnly(req: HttpRequest<any>) {
    /**
     * Put allowList of readonly routes here
     */
    const allowList = [/api\/heroes/gi];
    return allowList.some((item) => item.test(req.url));
  }
}
