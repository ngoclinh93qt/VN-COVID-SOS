import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';

import { prefixReq } from './http-config';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenService } from '../http/authen.service';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authHeader: string | undefined
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authHeader = this.storageService.token;
    if(!req.url.includes(environment.host)){
      return next.handle(req).pipe(this.handleErrors.bind(this));
    }
    if (!this.authHeader) {
      return next.handle(req).pipe(this.handleErrors.bind(this));
    }
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authHeader}`,
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    });

    return next.handle(authReq).pipe(this.handleErrors.bind(this));
  }

  handleErrors(source: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        return error.status === 401 ? this.handle401(error) : throwError(error);
      })
    );
  }

  handle401(error: HttpErrorResponse) {
    if (this.authHeader) {
      this.notificationService.error("Đã hết hạn đăng nhập")
      localStorage.clear();
      this.dialog.open(LoginFrameComponent,
        {panelClass: 'login-frame-dialog', width: '100%', maxWidth: '585px '})
    }
    return EMPTY;
  }
}
