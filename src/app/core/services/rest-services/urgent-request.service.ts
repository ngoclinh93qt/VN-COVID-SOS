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
  getGeneralData(){
    var res: IUrgentRequestGeneral={
      numRequest:this.getNumberOfRequest(),
      numSupported:this.getNumberOfSupportedRequests(),
      numUnsupported:this.getNumberOfUnsupportedRequests(),
    }
    return res
  }
  getNumberOfRequest(){
    return this.requests.length;
  }
  getNumberOfSupportedRequests(){
    var res=0;
    this.requests.forEach(request => {
      res+=request.isSupported?1:0
    });
    return res;
  }
  getNumberOfUnsupportedRequests(){
    var res=0;
    this.requests.forEach(request => {
      res+=request.isSupported?0:1
    });
    return res;
  }
  requests: IUrgentRequest[] = [
    {
      id: "1",
      isSupported: true,
      data:""
    },
    {
      id: "2",
      isSupported: true,
      data:""
    },
    {
      id: "3",
      isSupported: true,
      data:""
    },
    {
      id: "4",
      isSupported: false,
      data:""
    },
    {
      id: "5",
      isSupported: false,
      data:""
    },
  ];
  
  
}
