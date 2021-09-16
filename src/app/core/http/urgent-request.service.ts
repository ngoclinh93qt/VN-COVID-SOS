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


  updateSupporterStatus(request_id: string, body: ISupporterUpdate): Observable<ISOSRequest> {
    return this.http
      .post<{
        data: ISOSRequest;
      }>(`${this.host}/sos_requests/${request_id}/support`, body)
      .pipe(map((res) => res.data));
  }

  propose(request_id: string, body: any) {
    return this.http
      .post<{data: ISOSRequest}>(`${this.host}/sos_requests/${request_id}/suggest`, body)
      .pipe(
        map((res) => res.data)
      );
  }
  verifyRequest(request_id?: string, body?: any) {
    return this.http
      .post<{data: ISOSRequest}>(`${this.host}/sos_requests/${request_id}/verify`, body)
      .pipe(
        map((res) => res.data)
      );
  }
  updateRequestStatus(request_id?: string, body?: any) {
    return this.http
      .post<{data: ISOSRequest}>(`${this.host}/sos_requests/${request_id}/status`, body)
      .pipe(
        map((res) => res.data)
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
