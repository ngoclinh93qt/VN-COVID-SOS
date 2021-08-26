import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CSRFInterceptor } from './csrf.interceptor';
import { TransformResponseInterceptor } from './transform-response.interceptor';
import { LogHttpInterceptor } from './log-http.interceptor';
import { EnsureSSLInterceptor } from './ensure-ssl.interceptor';
import { LogHeadersInterceptor } from './log-headers.interceptor';
import { BusyInterceptor } from './busy.interceptor';
import { ReadOnlyInterceptor } from './read-only.interceptor';

export const httpInterceptorProviders = [
  // Log Http: Should be first-ish so it can log the Http call happening in and out (last).
  { provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, multi: true },
  // ReadOnly: Do this before we add headers, get busy, or make the call.
  { provide: HTTP_INTERCEPTORS, useClass: ReadOnlyInterceptor, multi: true },
  // SSL, Auth, CSRF:Now that it has passed the readonly test, we want to stuff headers and proceed.
  { provide: HTTP_INTERCEPTORS, useClass: EnsureSSLInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
  // Log headers: Must come after the headers are stuffed.
  { provide: HTTP_INTERCEPTORS, useClass: LogHeadersInterceptor, multi: true },
  // Busy: Should be first so it can turn on first, and off last.
  { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TransformResponseInterceptor,
    multi: true,
  },
];
