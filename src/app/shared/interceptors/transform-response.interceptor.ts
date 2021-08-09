import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { prefixRes } from './http-config';

@Injectable()
export class TransformResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';');
        } else console.info('event =', event, ';');
        return event;
      })
    );
  }
}
