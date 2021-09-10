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
  //'
  getGroupSuggested(id: string): Observable<ISOSRequest[]> {
    return this.http
      .get<{ data: ISOSRequest[] }>(`${this.host}/groups/${id}/suggest`)
      .pipe(map((res) => res.data));
  }
  getByRequesterId(id: string): Observable<ISOSRequest[]> {
    return this.http
      .get<{ data: ISOSRequest[] }>(
        `${this.host}/sos_requests?filter_requester_id=${id}`
      )
      .pipe(map((res) => res.data));
  }
  getJoinedRequests(id: string): Observable<ISOSRequest[]> {
    return this.http
      .get<{ data: ISOSRequest[] }>(
        `${this.host}/sos_requests?filter_supporter_id=${id}`
      )
      .pipe(map((res) => res.data));
  }
  search(body: any): Observable<ISOSRequest[]> {
    return this.http
      .post<{
        data: {
          sos_requests: ISOSRequest[];
          total: number;
        };
      }>(`${this.host}/sos_requests/search`, body)
      .pipe(map((res) => res.data.sos_requests));
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

  verifyRequest(request_id?: string, body?: any) {
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
