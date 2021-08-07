import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class UrgentRequestService extends RestService<IUrgentRequest>{
  public model: any;
  constructor(http: HttpClient) {
    super(http, '')

  }
  getGeneralData() {
    var res: IUrgentRequestGeneral = {
      numRequest: this.getNumberOfRequest(),
      numSupported: this.getNumberOfSupportedRequests(),
      numUnsupported: this.getNumberOfUnsupportedRequests(),
    }
    return res
  }
  getNumberOfRequest() {
    return this.requests.length;
  }
  getNumberOfSupportedRequests() {
    var res = 0;
    this.requests.forEach(request => {
      res += request.isSupported ? 1 : 0
    });
    return res;
  }
  getNumberOfUnsupportedRequests() {
    var res = 0;
    this.requests.forEach(request => {
      res += request.isSupported ? 0 : 1
    });
    return res;
  }
  getRequest() {
    return this.requests;
  }
  createPosition(lat:number, lng:number) {
    var res: IPosition = { lat: lat, lng: lng }
    return res;
  }
  requests: IUrgentRequest[] = [
    {
      id: "1",
      isSupported: true,
      data: "Cần Thuốc Hạ Sốt",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "RẤT NGUY CẤP",
      typeRequest: "Nhu Yếu Phẩm",
      position: this.createPosition(16.047079,108.206230)
    },
    {
      id: "2",
      isSupported: true,
      data: "Cần máy oxy gấp",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "NGUY CẤP",
      typeRequest: "Y tế",
      position: this.createPosition(10.762622,106.660172)
    },
    {
      id: "3",
      isSupported: true,
      data: "Cần nhu yếu phẩm",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "RẤT NGUY CẤP",
      typeRequest: "Nhu Yếu Phẩm",
      position: this.createPosition(10.502307,107.169205)
    },
    {
      id: "4",
      isSupported: false,
      data: "Cần máy oxy gấp",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "RẤT NGUY CẤP",
      typeRequest: "Y tế",
      position: this.createPosition(10.662622,106.660172)
    },
    {
      id: "5",
      isSupported: false,
      data: "Cần máy oxy gấp",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "NGUY CẤP",
      typeRequest: "Y tế",
      position: this.createPosition(10.792622,106.660172)
    },
    {
      id: "6",
      isSupported: true,
      data: "Cần máy oxy gấp",
      senderAddress: "106 Nguyễn Văn Quá",
      senderName: "Nguyễn Văn A",
      senderPhone: "012345678",
      status: "RẤT NGUY CẤP",
      typeRequest: "Y tế",
      position: this.createPosition(10.702622,106.660172)
    },
  ];


}
