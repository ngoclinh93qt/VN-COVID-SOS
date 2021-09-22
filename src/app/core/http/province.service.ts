import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService extends RestService<IProvince> {
  constructor(http: HttpClient) {
    super(http, 'provinces');
  }
  getDistrict(provinceID: string, districtID?: number): Observable<IDistrict> {
    return this.http
      .get<{ data: IDistrict }>(
        `${this.host}/${this.pathName}/${provinceID}/${districtID}`
      )
      .pipe(map((res) => res.data));
  }
  getProvinces(): Observable<IProvince[]> {
    return this.http
      .get<{ data: IProvince[] }>(`${this.host}/${this.pathName}`).pipe(
        map(res => res.data)
      );
  }
}
