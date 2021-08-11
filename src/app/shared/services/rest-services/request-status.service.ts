import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {

  constructor() { }
  getRequestStatus(){
    return ["Đã được hỗ trợ", "Chưa được hỗ trợ"];  
  }
}
