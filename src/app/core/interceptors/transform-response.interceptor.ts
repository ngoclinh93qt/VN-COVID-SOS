import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { prefixRes } from './http-config';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Injectable()
export class TransformResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // map((event) => {
      //   if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
      //     console.info('HttpResponse::event =', event, ';');
      //   } else console.info('event =', event, ';');
      //   return event;
      // })
    );
  }
}
