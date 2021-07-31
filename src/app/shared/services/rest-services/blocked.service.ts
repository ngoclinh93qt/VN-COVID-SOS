import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { NotificationService } from '../notification.service';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedService extends RestService {

  constructor(http: HttpClient, notif: NotificationService) { 
    super(http, notif, '')
  }
}
