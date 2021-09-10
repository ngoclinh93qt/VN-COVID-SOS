import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrgentRequestService extends RestService<ISOSRequest> {
  public host: string;
  constructor(http: HttpClient) {
    super(http, 'sos_requests');
    this.host = environment.host;
  }
  markRequest(request_id?: string, body?: any): Observable<ISOSRequest> {
    return this.http
      .post<{
        data: ISOSRequest
      }>(`${this.host}/sos_requests/${request_id}/bookmark`, body)
      .pipe(map((res) => res.data));
  }
  getByParams(path: string, queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.http
      .get<{ data: ISOSRequest[] }>(`${this.host}/${path}`, { params: { ...queryParams } })
      .pipe(map((res) => res.data));
  }

  getUserBookmarks(queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.getByParams('users/bookmark', queryParams);
  }
  getUserSuggested(queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.getByParams('users/suggest', queryParams);
  }
  getGroupSuggested(id: string, queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.getByParams(`groups/${id}/suggest`, queryParams);
  }
  getByRequesterId(id: string, queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.getByParams(`sos_requests?filter_requester_id=${id}`, queryParams);
  }
  getJoinedRequests(id: string, queryParams?: IQueryPrams): Observable<ISOSRequest[]> {
    return this.getByParams(`sos_requests?filter_supporter_id=${id}`, queryParams)
  }
  search(body: any, queryParams?: IQueryPrams): Observable<{
    sos_requests: ISOSRequest[];
    total: number;
  }> {
    return this.http
      .post<{
        data: {
          sos_requests: ISOSRequest[];
          total: number;
        };
      }>(`${this.host}/sos_requests/search`, body, { params: { ...queryParams } })
      .pipe(map((res) => res.data));
  }

  join(request_id: string, body: IJoinRequest): Observable<ISOSRequest> {
    return this.http
      .put<{
        data: ISOSRequest;
      }>(`${this.host}/sos_requests/${request_id}/support`, body)
      .pipe(map((res) => res.data));
  }
  propose(request_id: string, body: any) {
    return this.http
      .post(`${this.host}/sos_requests/${request_id}/suggest`, body)
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }

  verifyRequest(request_id: string, body: any) {
    return this.http
      .post(`${this.host}/sos_requests/${request_id}/status`, body)
      .pipe(
        map((res) => {
          console.log(res);
        })
      );
  }
  getGeneralData() {
    var res: IUrgentRequestGeneral = {
      numRequest: this.getNumberOfRequest(),
      numSupported: this.getNumberOfSupportedRequests(),
      numUnsupported: this.getNumberOfUnsupportedRequests(),
    };
    return res;
  }
  getNumberOfRequest() {
    return this.requests.length;
  }
  getNumberOfSupportedRequests() {
    var res = 0;
    this.requests.forEach((request) => {
      res += request.isSupported ? 1 : 0;
    });
    return res;
  }
  getNumberOfUnsupportedRequests() {
    var res = 0;
    this.requests.forEach((request) => {
      res += request.isSupported ? 0 : 1;
    });
    return res;
  }
  getRequest() {
    return this.requests;
  }
  createPosition(lat: number, lng: number) {
    var res: IPosition = { lat: lat, lng: lng };
    return res;
  }
  requests: IUrgentRequest[] = [
    {
      id: '1',
      isSupported: true,
      data: 'Cần Thuốc Hạ Sốt',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'RẤT NGUY CẤP',
      typeRequest: 'Nhu Yếu Phẩm',
      position: this.createPosition(16.047079, 108.20623),
      img: 'data:image/jpeg;base64,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',
    },
    {
      id: '2',
      isSupported: true,
      data: 'Cần máy oxy gấp',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'NGUY CẤP',
      typeRequest: 'Y tế',
      position: this.createPosition(10.762622, 106.660172),
      img: 'data:image/jpeg;base64,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',
    },
    {
      id: '3',
      isSupported: true,
      data: 'Cần nhu yếu phẩm',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'RẤT NGUY CẤP',
      typeRequest: 'Nhu Yếu Phẩm',
      position: this.createPosition(10.502307, 107.169205),
    },
    {
      id: '4',
      isSupported: false,
      data: 'Cần máy oxy gấp',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'RẤT NGUY CẤP',
      typeRequest: 'Y tế',
      position: this.createPosition(10.662622, 106.660172),
    },
    {
      id: '5',
      isSupported: false,
      data: 'Cần máy oxy gấp',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'NGUY CẤP',
      typeRequest: 'Y tế',
      position: this.createPosition(10.792622, 106.660172),
    },
    {
      id: '6',
      isSupported: true,
      data: 'Cần máy oxy gấp',
      senderAddress: '106 Nguyễn Văn Quá',
      senderName: 'Nguyễn Văn A',
      senderPhone: '012345678',
      status: 'RẤT NGUY CẤP',
      typeRequest: 'Y tế',
      position: this.createPosition(10.702622, 106.660172),
    },
  ];
}
