import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '../notification.service';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedService extends RestService<IBlocked> {

  constructor(http: HttpClient) { 
    super(http, '')
  }
}
