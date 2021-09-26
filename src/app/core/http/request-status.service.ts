import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestStatusService {
  static getRequestStatus(): string[] {
    throw new Error('Method not implemented.');
  }
  requestStatus: IRequestStatus[] = [
    {
      type: 'supporting',
      name: 'Đang được hỗ trợ',
    },
    {
      type: 'waiting',
      name: 'Đang chờ hỗ trợ',
    },
  ];
  constructor() { }
  getRequestStatus() {
    return this.requestStatus;
  }
}
