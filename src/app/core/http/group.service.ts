import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends RestService<IGroup>{
  constructor(http: HttpClient) {
    super(http, 'group');
  }
  search(body: any, queryParams?: IQueryPrams): Observable<{
    groups: IGroup[];
    total: number;
  }> {
    return this.http
      .post<{
        data: {
          groups: IGroup[];
          total: number;
        };
      }>(`${this.host}/groups/search`, body, { params: { ...queryParams } })
      .pipe(map((res) => res.data));
  }
}
