import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {
  static getRequestStatus(): string[] {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  getRequestStatus(){
    return ["Đã được hỗ trợ", "Chưa được hỗ trợ"];  
  }
}
