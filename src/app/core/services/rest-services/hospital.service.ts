import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '../notification.service';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends RestService<IHospital> {

  constructor(http: HttpClient) { 
    super(http, '')
  }
}
