import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpResponseBase,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { prefixReq, prefixRes } from './http-config';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    this.logRequest(req);
    return next.handle(req);
  }

  private logRequest(req: HttpRequest<any>) {
    console.groupEnd();
  }
}
