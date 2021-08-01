import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class RestService extends BaseHttpService {

  constructor(http: HttpClient, notif: NotificationService, private pathName: string) {
    super(http, notif)
  }


}


interface IRestServices<T>{
 findAll(): Observable<T[]>;
 findOne(): Observable<T>;
 findLimitOffset(): Observable<T[]>;
 findByOptions():Observable<T[]>;

}
