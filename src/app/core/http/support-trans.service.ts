import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class SupportTransService extends RestService<ITransaction> {
  constructor(http: HttpClient) {
    super(http, 'support_trans');
  }
  getRequestTrans(id?: string): Observable<ITransaction[]> {
    return this.http
      .get<{
        data: ITransaction[];
      }>(`${this.host}/support_trans?filter_sos_request_id=${id}`, {})
      .pipe(map((res) => res.data));
  }
}
