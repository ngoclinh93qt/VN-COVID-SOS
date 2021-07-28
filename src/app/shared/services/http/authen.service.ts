import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenService extends BaseHttpService {

  constructor(http: HttpClient, notif: NotificationService) { 
    super(http, notif)
  }
}
