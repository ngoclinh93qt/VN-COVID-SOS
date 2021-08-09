import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { prefixReq, prefixRes } from './http-config';
import { LoadingService } from '../services/common-services/loading.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
  constructor(private busyService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.start();
    return next.handle(req).pipe(
      finalize(() => {
        this.busyService.stop();
        console.groupCollapsed(`${prefixRes} Busy Spinner`);
        console.log('Decrementing');
        console.groupEnd();
      })
    );
  }
}
